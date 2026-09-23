import { describe, expect, test } from 'vitest';
import { Building } from '#engine/model/Building.ts';
import { Corridor } from '#engine/model/Corridor.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Fragment } from '#engine/model/Fragment.ts';
import { FragmentReader } from '#engine/model/FragmentReader.ts';
import { Keystone } from '#engine/model/Keystone.ts';
import type { Location } from '#engine/model/Location.ts';
import { Street } from '#engine/model/Street.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { CountingChildSource } from '#tests/support/CountingChildSource.ts';
import { fragment } from '#tests/support/fragment.ts';
import { must } from '#tests/support/world.ts';

const FLOORS = 3;

/** A street with two three-floor buildings of the same name (Guide:293-295: a Keystone opens one building, not a name). */
function street(): Street {
  const source: CountingChildSource = new CountingChildSource((parent: Location) => {
    const origin = (index: number) => ({ seed: parent.seed().branch(index), index, children: source });
    switch (parent.depth()) {
      case 0:
        return [0, 1].map(
          (index) =>
            new Building(
              { ...origin(index), parent },
              { name: 'Twin Spire', landmark: false, floors: FLOORS, doorsPerFloor: 2 },
            ),
        );
      case 1:
        return Array.from(
          { length: FLOORS },
          (_, number) =>
            new Floor(
              { ...origin(number), parent: parent as Building },
              { number, zone: 'LIVING_UNIT', sentence: 'The air hums.' },
            ),
        );
      case 2:
        return [new Corridor({ ...origin(0), parent: parent as Floor }, { sentence: 'A long corridor' })];
      default:
        return [];
    }
  });
  return new Street(
    { parent: undefined, seed: new Seed(3, 4), index: 0, children: source },
    { name: 'High Way' },
  );
}

function buildingOf(way: Street, index: number): Building {
  const unit = way.children()[index];
  if (!(unit instanceof Building)) throw new Error('a street holds buildings');
  return unit;
}

function floorOf(unit: Building, number: number): Floor {
  const floor = unit.children()[number];
  if (!(floor instanceof Floor)) throw new Error('a building holds floors');
  return floor;
}

/** Every floor sampled and seven merges: what the ritual asks (Guide:263-274; Building.groovy:33-35). */
function prime(unit: Building): void {
  for (let number = 0; number < FLOORS; number++) floorOf(unit, number).sample();
  for (let merge = 0; merge < 7; merge++) unit.infuse();
}

describe('the ritual on the building (Guide:257-276; Building.groovy:19-35, RitualTracker.groovy:22-39)', () => {
  test('a new building is not primed; a capture on a floor samples that floor, a merge inside counts; primed at every floor and seven merges', () => {
    const unit = buildingOf(street(), 0);
    expect(unit.primed()).toBe(false);
    expect(unit.status()).toBe('STRUCTURAL_STABLE');
    // A capture anywhere under the floor tells the floor, which tells the building (RitualTracker.groovy:26-33).
    must(floorOf(unit, 0).children()[0]).sample();
    floorOf(unit, 2).sample();
    floorOf(unit, 2).sample();
    expect(unit.sampled()).toEqual([0, 2]);
    for (let merge = 0; merge < 7; merge++) must(floorOf(unit, 1).children()[0]).infuse();
    expect(unit.merges()).toBe(7);
    expect(unit.status()).toBe('INFUSION_ACTIVE: 7');
    expect(unit.primed()).toBe(false);
    floorOf(unit, 1).sample();
    expect(unit.primed()).toBe(true);
    // A merge on the street counts for nobody; a sample above a floor reaches no building.
    const way = street();
    way.infuse();
    way.sample();
    expect(buildingOf(way, 0).merges()).toBe(0);
    expect(buildingOf(way, 0).sampled()).toEqual([]);
  });

  test('the seventh merge is counted after the check: forge answers nothing at six merges and every floor, the Keystone once the seventh is in (Guide:271-274; Player.groovy:92-94)', () => {
    const unit = buildingOf(street(), 0);
    for (let number = 0; number < FLOORS; number++) floorOf(unit, number).sample();
    for (let merge = 0; merge < 6; merge++) unit.infuse();
    expect(unit.forge([])).toBeUndefined();
    unit.infuse();
    const keystone = must(unit.forge([]));
    expect(keystone).toBeInstanceOf(Keystone);
    expect(keystone.name()).toBe('Twin Spire Keystone');
    expect(keystone.frequency().hertz()).toBe(0);
    // Decision 7: 0 Hz is not "divisible by 11" (HK-023).
    expect(keystone.resonant()).toBe(false);
    expect(keystone.key()).toBe(`keystone(${unit.address().toString()})`);
    expect(keystone.data()).toEqual({ kind: 'keystone', building: unit.address().toString() });
    // The same forge from a room under the building; nothing while the building's Keystone is already held.
    expect(
      must(floorOf(unit, 1).children()[0])
        .forge([fragment('Chain', 100)])
        ?.key(),
    ).toBe(keystone.key());
    expect(unit.forge([fragment('Chain', 100), keystone])).toBeUndefined();
    // A hybrid the buffer would make otherwise is not this building's business: the street forges nothing.
    expect(street().forge([])).toBeUndefined();
  });

  test('the Keystone is bound by address, not by name: a namesake forges its own and opens only itself (Guide:293-296; Building.groovy:37-39)', () => {
    const way = street();
    const first = buildingOf(way, 0);
    const twin = buildingOf(way, 1);
    prime(first);
    prime(twin);
    const key = must(first.forge([]));
    const twinKey = must(twin.forge([key]));
    expect(twinKey.name()).toBe(key.name());
    expect(twinKey.key()).not.toBe(key.key());
    expect(twin.forge([key, twinKey])).toBeUndefined();
    expect(floorOf(twin, FLOORS - 1).breachOffered([key])).toBe(false);
    expect(floorOf(twin, FLOORS - 1).breachOffered([key, twinKey])).toBe(true);
    expect(unitKeystone(first).key()).toBe(key.key());
  });

  test('the breach (Guide:275-276; Floor.groovy:64-80): offered on the top floor only, of a primed unbreached building, with its Keystone held, in either mode; it consumes the Keystone and marks the building', () => {
    const unit = buildingOf(street(), 0);
    const peak = floorOf(unit, FLOORS - 1);
    const key = new Keystone({ name: 'Twin Spire Keystone', building: unit.address() });
    expect(peak.breachOffered([key])).toBe(false);
    prime(unit);
    expect(peak.breachOffered([])).toBe(false);
    expect(peak.breachOffered([fragment('Chain', 100)])).toBe(false);
    expect(floorOf(unit, 0).breachOffered([key])).toBe(false);
    expect(floorOf(unit, 1).breachOffered([key])).toBe(false);
    expect(peak.breachOffered([key])).toBe(true);
    peak.enterCorridor();
    expect(peak.breachOffered([fragment('Chain', 100), key])).toBe(true);
    expect(floorOf(unit, 0).breach([key])).toBeUndefined();
    expect(unit.breached()).toBe(false);
    expect(peak.breach([fragment('Chain', 100), key])).toBe(key);
    expect(unit.breached()).toBe(true);
    expect(unit.status()).toBe('BEDROCK_BREACHED');
    expect(peak.remember()).toBe('corridor');
    expect(peak.breachOffered([key])).toBe(false);
    expect(peak.breach([key])).toBeUndefined();
  });

  test('the debug PRIME (Guide:438): every floor sampled and the count at seven, so the next merge forges', () => {
    const unit = buildingOf(street(), 0);
    expect(unit.prime()).toBe(true);
    expect(unit.sampled()).toEqual([0, 1, 2]);
    expect(unit.merges()).toBe(7);
    expect(unit.primed()).toBe(true);
    expect(must(floorOf(unit, 0).children()[0]).prime()).toBe(true);
    expect(street().prime()).toBe(false);
  });

  test('the memento (Decision 7 / HK-023: the breach has a home): elevator, sampled floors, merges and the breach, only what is not default; recall takes back only what the building could have written', () => {
    const unit = buildingOf(street(), 0);
    expect(unit.remember()).toBeUndefined();
    floorOf(unit, 2).arrive();
    expect(unit.remember()).toBe('{"elevator":2}');
    floorOf(unit, 0).arrive();
    floorOf(unit, 1).sample();
    unit.infuse();
    expect(unit.remember()).toBe('{"sampled":[1],"merges":1}');
    prime(unit);
    const key = must(unit.forge([]));
    floorOf(unit, 2).arrive();
    expect(floorOf(unit, 2).breach([key])).toBe(key);
    const full = must(unit.remember());
    expect(full).toBe('{"elevator":2,"sampled":[1,0,2],"merges":8,"breached":true}');
    const twin = buildingOf(street(), 0);
    expect(twin.recall(full)).toBe(true);
    expect(twin.remember()).toBe(full);
    expect(twin.breached()).toBe(true);
    expect(twin.primed()).toBe(true);
    expect(floorOf(twin, 2).current()).toBe(true);
    for (const bad of [
      '2',
      '',
      '{}',
      '[]',
      '{"elevator":3}',
      '{"elevator":-1}',
      '{"elevator":"2"}',
      '{"elevator":1.5}',
      '{"elevator":0}',
      '{"sampled":[]}',
      '{"sampled":[3]}',
      '{"sampled":[1,1]}',
      '{"sampled":["1"]}',
      '{"merges":0}',
      '{"merges":-1}',
      '{"merges":"7"}',
      '{"breached":false}',
      '{"breached":"yes"}',
      '{"elevator":2,"lobby":true}',
    ]) {
      const fresh = buildingOf(street(), 0);
      expect(fresh.recall(bad), bad).toBe(false);
      expect(fresh.remember(), bad).toBeUndefined();
    }
  });

  test('the reader: a Keystone comes back through the building its data names; a room, a street or a made-up address is refused', () => {
    const way = street();
    const unit = buildingOf(way, 1);
    const reader = new FragmentReader();
    const read = must(reader.read({ kind: 'keystone', building: unit.address().toString() }, way));
    expect(read.key()).toBe(`keystone(${unit.address().toString()})`);
    expect(read.name()).toBe('Twin Spire Keystone');
    expect(reader.read({ kind: 'keystone', building: way.address().toString() }, way)).toBeUndefined();
    expect(
      reader.read({ kind: 'keystone', building: floorOf(unit, 1).address().toString() }, way),
    ).toBeUndefined();
    expect(reader.read({ kind: 'keystone', building: '0.7' }, way)).toBeUndefined();
    expect(reader.read({ kind: 'keystone', building: 7 }, way)).toBeUndefined();
    expect(reader.read({ kind: 'keystone' }, way)).toBeUndefined();
    // The reader trusts nothing the world would not write back: a relic's data must come back as it went in.
    expect(reader.read({ kind: 'relic', from: '0.1', key: 'x', extra: 1 }, way)).toBeUndefined();
  });
});

function unitKeystone(unit: Building): Fragment {
  return must(unit.keystone());
}
