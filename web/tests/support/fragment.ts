import { Address } from '#engine/model/Address.ts';
import { Frequency } from '#engine/model/Frequency.ts';
import { Relic } from '#engine/model/Relic.ts';
import { RelicFragment } from '#engine/model/RelicFragment.ts';

/** Test double: a relic fragment with a name and a frequency, from nowhere in particular (address 0.1). */
export function fragment(name: string, hertz: number, resonant = false): RelicFragment {
  return new RelicFragment({
    relic: new Relic(`culture|${name.toLowerCase()}`, name),
    from: new Address([0, 1]),
    frequency: new Frequency(hertz),
    resonant,
  });
}
