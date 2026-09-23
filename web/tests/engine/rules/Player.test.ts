import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { Player } from '#engine/rules/Player.ts';
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
    const player = new Player({ coherence: 42, steps: 17, visited: ['0', '0.1'] });
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
