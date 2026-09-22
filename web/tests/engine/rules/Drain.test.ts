import { describe, expect, test } from 'vitest';
import { Country } from '#engine/model/Country.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import type { Location } from '#engine/model/Location.ts';
import { Street } from '#engine/model/Street.ts';
import { Trait } from '#engine/model/Trait.ts';
import { Universe } from '#engine/model/Universe.ts';
import { Vibe } from '#engine/model/Vibe.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Drain } from '#engine/rules/Drain.ts';
import { AbyssalStandIn } from '#tests/support/AbyssalStandIn.ts';
import { CountingChildSource } from '#tests/support/CountingChildSource.ts';
import { must } from '#tests/support/world.ts';

const SEED = new Seed(3, 4);
const RUST = new Culture('rust', 'red');
const NEON = new Culture('neon', 'bright-cyan');

/** A universe of one country per era, each with one street, and a place below one street that doubles the drain on its own. */
function world(): Universe {
  const eras = ['analog', 'entropic', 'future'];
  const source: CountingChildSource = new CountingChildSource((parent: Location) => {
    const origin = (index: number) => ({
      parent,
      seed: parent.seed().branch(index),
      index,
      children: source,
    });
    if (parent.depth() === 0) {
      return eras.map((era, index) => {
        const vibe = new Vibe({
          era: new Era(era),
          culture: RUST,
          secondCulture: NEON,
          secondEra: new Era('analog'),
        });
        return new Country(origin(index), { name: era, trait: new Trait('Industrial'), vibe });
      });
    }
    if (parent.depth() === 1) return [new Street(origin(0), { name: `${parent.name()} Way` })];
    if (parent.depth() === 2) return [new AbyssalStandIn(origin(0), { name: 'Layer -1' })];
    return [];
  });
  return new Universe({ parent: undefined, seed: SEED, index: 0, children: source });
}

describe('Drain — what one prompt costs where the traveller stands (Guide:133-139, TurnProcessor.groovy:52)', () => {
  const drain = new Drain();
  const universe = world();
  const street = (era: number): Location => must(universe.children()[era]?.children()[0]);

  test('one everywhere, before any command (Guide:133); the universe, above any era, costs one too', () => {
    expect(drain.cost(universe)).toBe(1);
    expect(drain.cost(street(0))).toBe(1);
    expect(drain.cost(street(2))).toBe(1);
  });

  test('two where the street’s era is entropic (Guide:137, 304-305); no era costs less', () => {
    expect(drain.cost(street(1))).toBe(2);
    expect(must(universe.children()[1]).vibe()?.era().key()).toBe('entropic');
  });

  test('the depth multiplier is the place’s own (Guide:137-139, I07’s bedrock): two below it, four with an entropic street', () => {
    expect(drain.cost(must(street(0).children()[0]))).toBe(2);
    expect(drain.cost(must(street(1).children()[0]))).toBe(4);
  });

  test('every place inherits its parent’s depth multiplier, 1 at the top', () => {
    expect(universe.drainFactor()).toBe(1);
    expect(street(1).drainFactor()).toBe(1);
    expect(must(street(1).children()[0]).drainFactor()).toBe(2);
  });
});
