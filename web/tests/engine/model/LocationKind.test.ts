import { expect, test } from 'vitest';
import { LocationKind } from '#engine/model/LocationKind.ts';

test('a kind is a value: its stable key is its identity; title, icon and index label ride along', () => {
  const planet = new LocationKind({ key: 'planet', title: 'Planet', icon: '⊕', indexLabel: 'ORBIT' });
  expect(planet.key()).toBe('planet');
  expect(planet.title()).toBe('Planet');
  expect(planet.icon()).toBe('⊕');
  expect(planet.indexLabel()).toBe('ORBIT');
  expect(planet.equals(new LocationKind({ key: 'planet', title: 'x', icon: 'x', indexLabel: 'x' }))).toBe(
    true,
  );
  expect(
    planet.equals(new LocationKind({ key: 'city', title: 'Planet', icon: '⊕', indexLabel: 'ORBIT' })),
  ).toBe(false);
});
