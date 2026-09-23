import { describe, expect, test } from 'vitest';
import type { Capture } from '#engine/model/Capture.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { Player } from '#engine/rules/Player.ts';
import { fragment } from '#tests/support/fragment.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);

describe('Player — the traveller: coherence, steps, the visited path (Player.groovy:15-48)', () => {
  test('a new traveller has 100 coherence, no steps and no footprints', () => {
    const player = new Player();
    expect(player.coherence().value()).toBe(100);
    expect(player.steps()).toBe(0);
    expect(player.footprints()).toEqual([]);
  });

  test('drain takes, restore gives back up to 100 (Player.groovy:50-52), a step counts one', () => {
    const player = new Player();
    player.drain(2);
    player.drain(1);
    expect(player.coherence().value()).toBe(97);
    player.restore(15);
    expect(player.coherence().value()).toBe(100);
    player.count();
    player.count();
    expect(player.steps()).toBe(2);
  });

  test('a footprint marks the place and every ancestor on the way (Guide:430), each once, in the order walked', () => {
    const universe = realRegistry().universe(SEED);
    const street = must(toStreet(universe, () => 0).at(-1));
    const player = new Player();
    player.markFootprint(street);
    expect(player.footprints()).toEqual(street.trail().map((step) => step.address().toString()));
    expect(player.footprints()).toHaveLength(8);
    expect(player.visited(street)).toBe(true);
    expect(player.visited(universe)).toBe(true);
    const building = must(street.children()[0]);
    expect(player.visited(building)).toBe(false);
    player.markFootprint(building);
    player.markFootprint(street);
    expect(player.visited(building)).toBe(true);
    expect(player.footprints()).toHaveLength(9);
    expect(player.footprints().at(-1)).toBe(building.address().toString());
    expect(player.placesVisited()).toBe(9);
  });

  test('a reboot brings coherence back to 100 and keeps the steps and the visited places (Guide:145-146)', () => {
    const universe = realRegistry().universe(SEED);
    const player = new Player();
    player.markFootprint(universe);
    player.count();
    player.drain(100);
    expect(player.coherence().exhausted()).toBe(true);
    player.reboot();
    expect(player.coherence().value()).toBe(100);
    expect(player.steps()).toBe(1);
    expect(player.footprints()).toEqual(['0']);
  });

  test('a traveller can be brought back from saved facts, as they were', () => {
    const player = new Player({ coherence: 42, steps: 17, visited: ['0', '0.1'], buffer: [], resonant: 0 });
    expect(player.coherence().value()).toBe(42);
    expect(player.steps()).toBe(17);
    expect(player.footprints()).toEqual(['0', '0.1']);
  });

  test('the debug INTEGRITY sets coherence to a value (Guide:441, SetIntegrityCommand.groovy:19)', () => {
    const player = new Player();
    player.setCoherence(35);
    expect(player.coherence().value()).toBe(35);
  });
});

describe('Player — the buffer and the resonance tally (Guide:141-142, 245-248; Player.groovy:58-61, 82-110)', () => {
  const found = (name: string, hertz: number, resonant: boolean, fresh = true): Capture => ({
    fragment: fragment(name, hertz, resonant),
    fresh,
  });

  test('a capture goes into the buffer; a fresh resonant one counts once; a re-take of a dropped fragment never counts (Decision 7)', () => {
    const player = new Player();
    expect(player.buffer().size()).toBe(0);
    expect(player.resonantTraces()).toBe(0);
    expect(player.capture(found('Rusted Chain', 1032, false))).toBe(true);
    expect(player.resonantTraces()).toBe(0);
    expect(player.capture(found('Paper Lantern', 1135, true))).toBe(true);
    expect(player.resonantTraces()).toBe(1);
    expect(player.capture(found('Paper Lantern', 1135, true, false))).toBe(true);
    expect(player.resonantTraces()).toBe(1);
    expect(
      player
        .buffer()
        .fragments()
        .map((each) => each.name()),
    ).toEqual(['Rusted Chain', 'Paper Lantern', 'Paper Lantern']);
  });

  test('a full buffer refuses a capture and counts nothing', () => {
    const player = new Player();
    for (let n = 0; n < 16; n++) player.capture(found(`Item ${String(n)}`, 1, false));
    expect(player.capture(found('Late', 11, true))).toBe(false);
    expect(player.buffer().size()).toBe(16);
    expect(player.resonantTraces()).toBe(0);
  });

  test('a merge gives 15 coherence back, capped at 100, and counts when the hybrid resonates (a multiple of 11); a refused merge gives nothing (HK-015)', () => {
    const player = new Player();
    player.drain(50);
    player.capture(found('Rusted Chain', 33, false));
    player.capture(found('Paper Lantern', 88, false));
    player.capture(found('Bone Flute', 5, false));
    expect(player.merge(0, 0)).toBeUndefined();
    expect(player.merge(0, 9)).toBeUndefined();
    expect(player.coherence().value()).toBe(50);
    const hybrid = player.merge(0, 1);
    expect(hybrid?.name()).toBe('Rusted-Paper Hybrid');
    expect(hybrid?.frequency().hertz()).toBe(121);
    expect(player.coherence().value()).toBe(65);
    expect(player.resonantTraces()).toBe(1);
    expect(player.merge(0, 1)?.name()).toBe('Bone-Rusted-Paper Hybrid'); // 126 Hz: not resonant
    expect(player.coherence().value()).toBe(80);
    expect(player.resonantTraces()).toBe(1);
    player.setCoherence(90);
    player.capture(found('Late', 1, false));
    player.merge(0, 1);
    expect(player.coherence().value()).toBe(100);
  });

  test('a drop takes the fragment out of the buffer and hands it over', () => {
    const player = new Player();
    player.capture(found('Rusted Chain', 1032, false));
    expect(player.drop(0)?.name()).toBe('Rusted Chain');
    expect(player.buffer().size()).toBe(0);
    expect(player.drop(0)).toBeUndefined();
  });

  test('a reboot keeps the buffer and the tally (Guide:145: "You keep your buffer")', () => {
    const player = new Player();
    player.capture(found('Paper Lantern', 1135, true));
    player.drain(100);
    player.reboot();
    expect(player.buffer().size()).toBe(1);
    expect(player.resonantTraces()).toBe(1);
  });

  test('a traveller brought back from saved facts has the buffer and the tally as saved', () => {
    const player = new Player({
      coherence: 42,
      steps: 17,
      visited: ['0', '0.1'],
      buffer: [fragment('A', 1), fragment('B', 2)],
      resonant: 3,
    });
    expect(
      player
        .buffer()
        .fragments()
        .map((each) => each.name()),
    ).toEqual(['A', 'B']);
    expect(player.resonantTraces()).toBe(3);
  });
});
