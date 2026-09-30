import { expect, test } from 'vitest';
import { LocationKind } from '#engine/model/LocationKind.ts';

test('a kind is a value: its stable key is its identity; title, scale, icon and how it counts its places ride along', () => {
  const planet = new LocationKind({
    key: 'planet',
    glyph: 'planet',
    title: 'Planet',
    scale: '10⁷ m',
    icon: '⊕',
    indexLabel: 'ORBIT',
  });
  expect(planet.key()).toBe('planet');
  expect(planet.title()).toBe('Planet');
  expect(planet.icon()).toBe('⊕');
  expect(planet.scale()).toBe('10⁷ m');
  expect(planet.position(2, 5)).toEqual({ counted: true, label: 'ORBIT', index: 2, total: 5 });
  expect(
    planet.equals(
      new LocationKind({
        key: 'planet',
        glyph: 'planet',
        title: 'x',
        scale: '10⁷ m',
        icon: 'x',
        indexLabel: 'x',
      }),
    ),
  ).toBe(true);
  expect(
    planet.equals(
      new LocationKind({
        key: 'city',
        glyph: 'city',
        title: 'Planet',
        scale: '10⁷ m',
        icon: '⊕',
        indexLabel: 'ORBIT',
      }),
    ),
  ).toBe(false);
});

test('a kind made without an index label does not count its places (a floor)', () => {
  const floor = new LocationKind({ key: 'floor', glyph: 'floor', title: 'Floor', scale: '10⁷ m', icon: '▤' });
  expect(floor.position(2, 5)).toEqual({ counted: false });
});
