import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';

describe('deep equality sees value objects', () => {
  test('two values of one class are equal by their equals, not by their (private) shape', () => {
    expect({ noise: new Seed(1, 2) }).not.toEqual({ noise: new Seed(3, 4) });
    expect({ noise: new Seed(1, 2) }).toEqual({ noise: new Seed(1, 2) });
  });

  test('a value is never equal to a plain object', () => {
    expect(new Seed(1, 2)).not.toEqual({});
  });
});
