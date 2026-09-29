import { describe, expect, test } from 'vitest';
import { Roof } from '#ui/scene/Roof.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';

const roofs = new Roof(new SceneHash());
const addresses = Array.from({ length: 60 }, (_, n) => `0.0.0.0.0.0.0.0.${String(n)}`);

describe('which roof a building has (U02): the street and the tower draw it alike', () => {
  test('a landmark always wears the peak; any other building one of three, by its address', () => {
    expect(addresses.every((address) => roofs.of(address, true) === 'peak')).toBe(true);
    const others = new Set(addresses.map((address) => roofs.of(address, false)));
    expect([...others].sort()).toEqual(['box', 'flat', 'mast']);
  });

  test('the same building, the same roof', () => {
    expect(addresses.map((address) => roofs.of(address, false))).toEqual(
      addresses.map((address) => roofs.of(address, false)),
    );
  });
});
