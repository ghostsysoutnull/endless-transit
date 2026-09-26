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
    `room: ${room.name()} (${String(room.parent()?.children().length)} rooms), ${room.description().join(' ')} ${room.status()}`,
  ];
}

/**
 * First snapshot pins — real content, real kernel, real generator. Literals on purpose: a diff here is a
 * finding (a content edit, a changed key, a changed rule), never a chore to regenerate blindly.
 */
test('seed 7F3A-91C2-0B4D-E6A8, first child all the way down', () => {
  expect(namesAlong(new Seed(0x7f3a91c2, 0x0b4de6a8), 0)).toEqual([
    'universe: The Endless Universe',
    'filament: Zeta-915-Link',
    'sector: Outer Expanse 91',
    'solar-system: Zeta Borealis',
    'planet: Auraea',
    'country: Southern Glacier Kingdom',
    'city: Rainhaven',
    'street: Bright Boulevard',
    'vibe: baroque/future, then shogun/industrial, Industrial @ 0.77',
    'buildings: 4, first: Ornate Sanctum',
    'building 0: Ornate Sanctum, 16 floors, 9 doors, corridor theme baroque, top floor Peak observatory',
    'doors: _void_sink_ Brutalist Slab [PITTED] | Lacquered Timber Gate [WEEPING] | ⟨RESONANCE⟩ Synth-Glass Slab [PITTED] | _quarantine_ Riveted Iron Hatch [FROZEN] | Industrial Barrier [SCORCHED] | Synth-Glass Slab [PITTED] | Frosted Crystal Pane [WEEPING] | Synth-Glass Slab [SCORCHED] | Reinforced Polymer [RUSTED]',
    'room: Grand Power Plant (2 rooms), You are in gantry-braced architecture that vibrates with every pulse. The walls are blue silk damask with gold thread. The space is illuminated by a soft holographic haze with no visible source. ATMOS: 14% | TEMP: 7°C',
  ]);
});

test('seed 0000-0000-0000-0000, second child all the way down', () => {
  expect(namesAlong(new Seed(0, 0), 1)).toEqual([
    'universe: The Endless Universe',
    'filament: Epsilon-100-Thread',
    'null-reach: Null Reach A63',
    'solar-system: Zeta Kapteyn',
    'planet: Hydrael',
    'country: Great Jungle Domain',
    'city: Starpeak',
    'street: Dark Way',
    'vibe: gilded/analog, then zenith/atomic, Ceremonial @ 0.855',
    'buildings: 4, first: SalonSpire',
    'building 1: Velvet Conservatory, 5 floors, 3 doors, corridor theme gilded, top floor Peak observatory',
    'doors: Industrial Barrier [FROZEN] | Brutalist Slab [STATIC] | Brutalist Slab [PITTED]',
    'room: Lacquered Ritual Chamber (7 rooms), You are in sacred geometric reconstruction. The walls are purple panels of tooled leather and brass studs. The space is illuminated by the amber glow of a radio dial. ATMOS: 16% | TEMP: 11°C',
  ]);
});

test('seed 0000-1234-0000-4660, third child all the way down', () => {
  expect(namesAlong(new Seed(0x1234, 0x4660), 2)).toEqual([
    'universe: The Endless Universe',
    'filament: Theta-139-Strand',
    'sector: Core Sector 53',
    'solar-system: Betelgeuse Major',
    'planet: Neoum',
    'country: The United Frost Lands',
    'city: Blacktown',
    'street: Low Path',
    'vibe: neon/industrial, then rust/atomic, Ceremonial @ 0.9',
    'buildings: 8, first: StripWell',
    'building 2: Fluorescent Terminal, 7 floors, 2 doors, corridor theme neon, top floor Peak observatory',
    'doors: [VOID_SINK] Pitted Concrete | ⟨VOID_SINK⟩ Synth-Glass Slab [SCORCHED]',
    'room: Synthetic Memory Well (7 rooms), You are in a circular nave beneath a dark dome. The walls are gray corrugated plastic over flickering tubes. The space is illuminated by sparks arcing from an open junction. ATMOS: 19% | TEMP: 16°C',
  ]);
});
