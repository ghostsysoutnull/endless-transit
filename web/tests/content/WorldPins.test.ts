import { expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

/**
 * The names from the universe down to a street, always taking the child at `index` (wrapped to what
 * exists); then into building `index`, its lobby's corridor, door `index` and the first room behind it.
 */
function namesAlong(seed: Seed, index: number): string[] {
  const chain = toStreet(realRegistry().universe(seed), () => index);
  const street = must(chain.at(-1));
  const vibe = street.vibe();
  const building = must(street.children()[index % street.children().length]);
  const lobby = must(building.children()[0]);
  lobby.move('corridor');
  const door = must(lobby.listing()[index % lobby.listing().length]);
  const room = door.arrival();
  return [
    ...chain.map((location) => `${location.kind().key()}: ${location.name()}`),
    `vibe: ${vibe?.culture().key() ?? '-'}/${vibe?.era().key() ?? '-'}, then ${vibe?.secondCulture().key() ?? '-'}/${vibe?.secondEra().key() ?? '-'}, ${vibe?.mutation()?.key() ?? '-'} @ ${String(vibe?.stability())}`,
    `buildings: ${String(street.children().length)}, first: ${street.children()[0]?.name() ?? '-'}`,
    `building ${String(index)}: ${building.name()}, ${String(building.listing().length)} floors, ${String(lobby.listing().length)} doors, corridor theme ${lobby.facts()[0]?.value ?? '-'}, top floor ${must(building.listing()[0]).readings()[0]?.value ?? '-'}`,
    `doors: ${lobby
      .listing()
      .map((each) => each.name())
      .join(' | ')}`,
    `room: ${room.name()} (${String(room.parent()?.children().length)} rooms), ${room.description().join(' ')}`,
  ];
}

/**
 * First snapshot pins — real content, real kernel, real generator. Literals on purpose: a diff here is a
 * finding (a content edit, a changed key, a changed rule), never a chore to regenerate blindly.
 */
test('seed 7F3A-91C2-0B4D-E6A8, first child all the way down', () => {
  expect(namesAlong(new Seed(0x7f3a91c2, 0x0b4de6a8), 0)).toEqual([
    'universe: The Endless Universe',
    'filament: Uniform-915-Tether',
    'sector: Upper Shoal 91',
    'solar-system: Alcor Prime',
    'planet: Dominia',
    'country: Ancient Vesper Assembly',
    'city: Angeltether',
    'street: Requiem Slipway',
    'vibe: baroque/future, then shogun/industrial, Industrial @ 0.77',
    'buildings: 4, first: Censed Altar',
    'building 0: Censed Altar, 16 floors, 9 doors, corridor theme baroque, top floor Cooling crown',
    'doors: Velvet-Padded Door, iridescent | Rose-Window Pane | Censer-Grille Gate, knitting | Choir-Stall Door, seamless | Ivory Inlay Door, cryogenic | Gilt Chapel Door, shimmering | Fresco Panel, glassy | Carved Oak Portal, breathing | Brass Reliquary Hatch, weightless',
    'room: Candlelit Maintenance Bay (2 rooms), You are in gantry-braced architecture that vibrates with every pulse. The walls are blue silk damask with gold thread. The space is illuminated by a soft holographic haze with no visible source.',
  ]);
});

test('seed 0000-0000-0000-0000, second child all the way down', () => {
  expect(namesAlong(new Seed(0, 0), 1)).toEqual([
    'universe: The Endless Universe',
    'filament: Tah-100-Current',
    'null-reach: Null Reach Lapse',
    'solar-system: Deneb Groombridge',
    'planet: Rubinan',
    'country: Northern Amber Communion',
    'city: Rubywood',
    'street: Champagne Avenue',
    'vibe: gilded/analog, then zenith/atomic, Ceremonial @ 0.855',
    'buildings: 4, first: ConservatoryCrank',
    'building 1: Burnished Emporium, 5 floors, 3 doors, corridor theme gilded, top floor Sky altar',
    'doors: Brass-Bound Door, yellowed | Etched Crystal Pane, dusty | Porcelain Tile Door, rattling',
    'room: Engraved Oracle Terminal (7 rooms), You are in sacred geometric reconstruction. The walls are purple panels of tooled leather and brass studs. The space is illuminated by the amber glow of a radio dial.',
  ]);
});

test('seed 0000-1234-0000-4660, third child all the way down', () => {
  expect(namesAlong(new Seed(0x1234, 0x4660), 2)).toEqual([
    'universe: The Endless Universe',
    'filament: Heth-139-Tether',
    'sector: Leading Sector 53',
    'solar-system: Canopus Pavonis',
    'planet: Fluxun',
    'country: Democratic Chrome Sanctuary',
    'city: Signalyard',
    'street: Buzzing Quay',
    'vibe: neon/industrial, then rust/atomic, Ceremonial @ 0.9',
    'buildings: 10, first: NexusForge',
    'building 2: Mirrored Booth, 7 floors, 2 doors, corridor theme neon, top floor Stargazer chapel',
    'doors: Carbon Weave Panel, photographic | Mirror-Film Door, steaming',
    'room: Lucid Archive (7 rooms), You are in a circular nave beneath a dark dome. The walls are gray corrugated plastic over flickering tubes. The space is illuminated by sparks arcing from an open junction.',
  ]);
});
