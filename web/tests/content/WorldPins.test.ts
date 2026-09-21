import { expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { descend, realRegistry } from '#tests/support/world.ts';

/** The names from the universe down to a street, always taking the child at `index` (wrapped to what exists). */
function namesAlong(seed: Seed, index: number): string[] {
  const chain = descend(realRegistry().universe(seed), () => index);
  const street = chain.at(-1);
  const vibe = street?.vibe();
  return [
    ...chain.map((location) => `${location.kind().key()}: ${location.name()}`),
    `vibe: ${vibe?.culture().key() ?? '-'}/${vibe?.era().key() ?? '-'}, then ${vibe?.secondCulture().key() ?? '-'}/${vibe?.secondEra().key() ?? '-'}, ${vibe?.mutation()?.key() ?? '-'} @ ${String(vibe?.stability())}`,
    `buildings: ${String(street?.children().length)}, first: ${street?.children()[0]?.name() ?? '-'}`,
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
  ]);
});
