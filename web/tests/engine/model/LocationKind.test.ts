import { expect, test } from 'vitest';
import { LocationKind } from '#engine/model/LocationKind.ts';

test('a kind is a value: its stable key is its identity; title, icon and how it counts its places ride along', () => {
  const planet = new LocationKind({ key: 'planet', title: 'Planet', icon: '⊕', indexLabel: 'ORBIT' });
  expect(planet.key()).toBe('planet');
  expect(planet.title()).toBe('Planet');
  expect(planet.icon()).toBe('⊕');
  expect(planet.position(2, 5)).toEqual({ counted: true, label: 'ORBIT', index: 2, total: 5 });
  expect(planet.equals(new LocationKind({ key: 'planet', title: 'x', icon: 'x', indexLabel: 'x' }))).toBe(
    true,
  );
  expect(
    planet.equals(new LocationKind({ key: 'city', title: 'Planet', icon: '⊕', indexLabel: 'ORBIT' })),
  ).toBe(false);
});

test('a kind made without an index label does not count its places (a floor)', () => {
  const floor = new LocationKind({ key: 'floor', title: 'Floor', icon: '▤' });
  expect(floor.position(2, 5)).toEqual({ counted: false });
});
