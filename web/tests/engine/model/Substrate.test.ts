import { describe, expect, test } from 'vitest';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { Room } from '#engine/model/Room.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Drain } from '#engine/rules/Drain.ts';
import { FrameEntropy } from '#engine/rules/FrameEntropy.ts';
import { Telemetry } from '#engine/rules/Telemetry.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);

/** Bright Boulevard's Ornate Sanctum (16 floors, 9 doors), fresh. */
function sanctum(): { street: Location; building: Building } {
  const street = must(toStreet(registry.universe(SEED), () => 0).at(-1));
  const building = street.children()[0];
  if (!(building instanceof Building)) throw new Error('a street holds buildings');
  return { street, building };
}

function floorOf(building: Building, number: number): Floor {
  const floor = building.floorNumbered(number);
  if (!(floor instanceof Floor)) throw new Error(`no floor ${String(number)}`);
  return floor;
}

/** Breached the way the game does it, without the ritual: the building's own memento. */
function breach(building: Building): void {
  expect(building.recall('{"breached":true}')).toBe(true);
}

describe('the substrate (Guide:277-284; Building.groovy:248-275, Floor.groovy:88-124)', () => {
  test('a building holds its floors and, past them, ten Layers — child floors + k − 1 is Layer −k; they are listed and reachable only once the bedrock is breached', () => {
    const { building } = sanctum();
    expect(building.layers()).toBe(10);
    expect(building.children()).toHaveLength(26);
    expect(
      building
        .children()
        .slice(0, 16)
        .map((floor) => floor.kind().key()),
    ).toEqual(Array.from({ length: 16 }, () => 'floor'));
    expect(
      building
        .children()
        .slice(16)
        .map((layer) => layer.kind().key()),
    ).toEqual(Array.from({ length: 10 }, () => 'layer'));
    expect(
      building
        .children()
        .slice(16)
        .map((layer) => layer.ordinal()),
    ).toEqual([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]);
    expect(building.listing()).toHaveLength(16);
    expect(building.floorNumbered(-1)).toBeUndefined();
    expect(building.floorNumbered(16)).toBeUndefined();
    // Until the breach a Layer is sealed: nowhere for the walker, so no save and no visited path can name one.
    expect(building.children()[16]?.sealed()).toBe(true);
    expect(building.descendant(building.address().child(16))).toBeUndefined();
    expect(floorOf(building, 0).neighbour(-1)).toBeUndefined();
    expect(
      floorOf(building, 0)
        .moves()
        .map((move) => move.id),
    ).toEqual(['up', 'corridor']);
    breach(building);
    expect(building.listing()).toHaveLength(26);
    expect(
      building
        .listing()
        .slice(16)
        .map((layer) => layer.name()),
    ).toEqual([
      'Layer -0x1',
      'Layer -0x2',
      'Layer -0x3',
      'Layer -0x4',
      'Layer -0x5',
      'Layer -0x6',
      'Layer -0x7',
      'Layer -0x8',
      'Layer -0x9',
      'Layer -0xA',
    ]);
    expect(building.children()[16]?.sealed()).toBe(false);
    expect(building.floorNumbered(-1)).toBe(building.children()[16]);
    expect(building.floorNumbered(-10)).toBe(building.children()[25]);
    expect(building.floorNumbered(-11)).toBeUndefined();
    expect(building.status()).toBe('BEDROCK_BREACHED');
  });

  test('descend: from floor 0 of a breached building `down` says Descend into the Substrate and leads to Layer −1; below, Go Down and Go Up walk the layers; the way up from −1 is floor 0 (Guide:277-278; ElevatorState.groovy:202-208)', () => {
    const { building } = sanctum();
    breach(building);
    const lobby = floorOf(building, 0);
    expect(lobby.moves().map((move) => [move.id, move.label, move.opposite])).toEqual([
      ['up', 'Go Up', 'down'],
      ['descend', 'Descend into the Substrate', 'up'],
      ['corridor', 'Enter Corridor', 'elevator'],
    ]);
    const first = lobby.move('descend');
    expect(first).toBe(building.floorNumbered(-1));
    const layer = floorOf(building, -1);
    expect(layer.moves().map((move) => move.id)).toEqual(['up', 'down', 'corridor']);
    expect(layer.move('up')).toBe(lobby);
    expect(layer.move('down')).toBe(building.floorNumbered(-2));
    expect(
      floorOf(building, -10)
        .moves()
        .map((move) => move.id),
    ).toEqual(['up', 'corridor']);
    expect(
      floorOf(building, 1)
        .moves()
        .map((move) => move.id),
    ).toEqual(['up', 'down', 'corridor']);
    // The breach is never offered as a move of the table: it is the journey's transaction (it consumes the Keystone).
    expect(
      floorOf(building, 15)
        .moves()
        .map((move) => move.id),
    ).toEqual(['down', 'corridor']);
  });

  test('a Layer: its name in hex, the ABYSSAL_SUBSTRATE zone, the pressure reading that saturates at −10 (Building.groovy:93-97), the abyssal diagnostic, double drain', () => {
    const { building } = sanctum();
    breach(building);
    const layer = floorOf(building, -1);
    expect(layer.kind().title()).toBe('Layer');
    expect(layer.kind().icon()).toBe('▤');
    expect(layer.kind().indexLabel()).toBe('STRATA');
    expect(layer.number()).toBe(-1);
    expect(layer.callSign()).toBe('Layer -0x1');
    expect(layer.readings().map((fact) => [fact.label, fact.value])).toEqual([
      ['FUNCTION', 'ABYSSAL_SUBSTRATE'],
      ['ST', 'P: 10%'],
      ['RES', `${String(layer.resonance())}Hz`],
    ]);
    expect(floorOf(building, -10).readings()[1]?.value).toBe('P: 100%');
    expect(layer.description()).toEqual([
      'Layer -0x1. The air is thick with oily static and the hum of abyssal substrate.',
      'Local signal is STABLE. Corridor access authorized.',
    ]);
    expect(layer.status()).toBe('SYSTEM_STATUS: [ABYSS_SYNC]');
    expect(layer.abyssal()).toBe(true);
    expect(floorOf(building, 0).abyssal()).toBe(false);
    expect(building.abyssal()).toBe(false);
    expect(layer.drainFactor()).toBe(2);
    expect(floorOf(building, 0).drainFactor()).toBe(1);
    // The Layer's own screens read the street's era for the drain (Guide:138); its artery and below are never entropic.
    expect(layer.drainEra()?.key()).toBe(floorOf(building, 0).drainEra()?.key());
  });

  test('below a Layer: the Artery, its Crypts and their Shards — one culture, the abyssal one, in the atomic era, under the country’s trait (Corridor.groovy:112-122, Apartment.groovy:31-43, Room.groovy:39-65)', () => {
    const { street, building } = sanctum();
    breach(building);
    const layer = floorOf(building, -1);
    const artery = must(layer.children()[0]);
    expect(layer.children()).toHaveLength(1);
    expect(artery.kind().key()).toBe('artery');
    expect(artery.kind().title()).toBe('Artery');
    expect(artery.name()).toBe('Artery');
    expect(artery.description()).toEqual(['A pulsing, organic artery of data.']);
    expect(artery.status()).toBe('TRAFFIC: [PRESSURE_HIGH] | THEME: [ABYSSAL]');
    expect(artery.facts()).toEqual([{ key: 'culture', label: 'THEME', value: 'abyssal' }]);
    expect(artery.arrival()).toBe(layer);
    expect(artery.abyssal()).toBe(true);
    const vibe = must(artery.vibe());
    expect(vibe.culture().key()).toBe('abyssal');
    expect(vibe.era().key()).toBe('atomic');
    expect(vibe.frame()).toBe('abyssal');
    expect(vibe.mutation()?.key()).toBe(street.vibe()?.mutation()?.key());
    expect(artery.drainEra()?.key()).toBe('atomic');
    const crypts = artery.children();
    expect(crypts).toHaveLength(building.doorsPerFloor());
    for (const crypt of crypts) {
      expect(crypt.kind().key()).toBe('crypt');
      expect(crypt.kind().title()).toBe('Crypt');
      expect(crypt.facts()).toEqual([{ key: 'alert', label: 'ABYSSAL_RESONANCE', value: 'DETECTED' }]);
      expect(crypt.status()).toBe('ATMOS: [PRESSURE_HIGH]');
      expect(crypt.abyssal()).toBe(true);
      expect(crypt.drainFactor()).toBe(2);
      expect(crypt.drainEra()?.key()).toBe('atomic');
      const shards = crypt.children();
      expect(shards.length).toBeGreaterThan(0);
      for (const shard of shards) {
        expect(shard.kind().key()).toBe('shard');
        expect(shard.kind().title()).toBe('Shard');
        expect(shard.kind().icon()).toBe('☠');
        expect(shard.kind().indexLabel()).toBe('SHARD');
        expect(shard.abyssal()).toBe(true);
        expect(shard.leaveLabel()).toBe('Exit Crypt');
        expect(shard).toBeInstanceOf(Room);
      }
      // The first shard's kind is what the crypt's door was traced for.
      if (!(crypt instanceof Apartment)) throw new Error('a crypt is an apartment');
      expect((crypt.children()[0] as Room).category().equals(crypt.behind())).toBe(true);
    }
  });

  test('what lies down there comes from the abyssal list of 28 and takes the culture bonus, resonant, every time (Guide:281-284)', () => {
    const { building } = sanctum();
    breach(building);
    const drain = new Drain();
    const layer = floorOf(building, -2);
    let objects = 0;
    for (const crypt of must(layer.children()[0]).children()) {
      for (const shard of crypt.children()) {
        for (const fragment of must(shard.contents() ?? undefined).objects) {
          expect(fragment.resonant(), fragment.name()).toBe(true);
          objects++;
        }
        expect(drain.cost(shard)).toBe(2);
      }
    }
    expect(objects).toBeGreaterThan(40);
    const names = must(
      layer.children()[0]?.children()[0]?.children()[0]?.contents() ?? undefined,
    ).objects.map((each) => each.name());
    expect(
      names.some((name) =>
        /exception|thread|process|cube|observer|altar|sigil|pact|deity|gate|hunger|null/.test(name),
      ),
    ).toBe(true);
  });

  test('the void’s voice (Guide:283; HUDHeaderComponent.groovy:85-88): below the bedrock about a third of the frames carry one of four lines, drawn on the frame; above it never', () => {
    const { building } = sanctum();
    breach(building);
    const telemetry = new Telemetry();
    const layer = floorOf(building, -1);
    const voices = new Set<string>();
    let silent = 0;
    for (let steps = 0; steps < 300; steps++) {
      const voice = telemetry.of(layer, new FrameEntropy().of(layer, steps))?.voice ?? null;
      if (voice === null) silent++;
      else voices.add(voice);
      expect(
        telemetry.of(floorOf(building, 0), new FrameEntropy().of(floorOf(building, 0), steps))?.voice,
      ).toBeNull();
    }
    expect([...voices].sort()).toEqual([
      'Bedrock approaching.',
      'It is cold down here.',
      'Return to the surface.',
      'We see you.',
    ]);
    expect(silent).toBeGreaterThan(170);
    expect(silent).toBeLessThan(250);
    expect(telemetry.of(layer, new FrameEntropy().of(layer, 7))?.voice).toBe(
      telemetry.of(layer, new FrameEntropy().of(layer, 7))?.voice,
    );
  });

  test('position: a floor stands among the floors, a layer among the layers (peers), so Z-AXIS reads 16 of 16 and STRATA 10 of 10', () => {
    const { building } = sanctum();
    breach(building);
    expect(floorOf(building, 15).peers()).toHaveLength(16);
    expect(floorOf(building, 15).peers().indexOf(floorOf(building, 15))).toBe(15);
    expect(floorOf(building, -10).peers()).toHaveLength(10);
    expect(floorOf(building, -10).peers().indexOf(floorOf(building, -10))).toBe(9);
    expect(building.peers()).toHaveLength(4);
    expect(registry.universe(SEED).peers()).toEqual([]);
  });

  test('the elevator may stand on a Layer only once breached: the memento says so, and a save below the bedrock is one the building takes back', () => {
    const { building } = sanctum();
    expect(building.recall('{"elevator":-1}')).toBe(false);
    expect(building.recall('{"elevator":-1,"breached":true}')).toBe(true);
    expect(building.remember()).toBe('{"elevator":-1,"breached":true}');
    expect(building.admits(floorOf(building, -1))).toBe(true);
    expect(building.recall('{"elevator":-11,"breached":true}')).toBe(false);
    expect(building.recall('{"elevator":-10,"breached":true}')).toBe(true);
  });

  test('eighteen kinds are registered: the fourteen of the surface and the four below the bedrock', () => {
    expect(registry.kinds().map((kind) => kind.key())).toEqual([
      'universe',
      'filament',
      'sector',
      'null-reach',
      'solar-system',
      'planet',
      'country',
      'city',
      'street',
      'building',
      'floor',
      'corridor',
      'apartment',
      'room',
      'layer',
      'artery',
      'crypt',
      'shard',
    ]);
  });
});
