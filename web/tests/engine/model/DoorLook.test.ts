import { describe, expect, test } from 'vitest';
import { doorLook } from '#tests/support/doorLook.ts';

describe('a door’s look is a value: equal by its names and keys', () => {
  test('two looks of the same material, state and keys are the same look', () => {
    expect(doorLook()).toEqual(doorLook());
  });

  test('a look differs when any one of its names or keys does', () => {
    expect(doorLook()).not.toEqual(doorLook({ material: 'Pitted Concrete' }));
    expect(doorLook()).not.toEqual(doorLook({ state: 'Frozen' }));
    expect(doorLook()).not.toEqual(doorLook({ family: 'stone' }));
    expect(doorLook()).not.toEqual(doorLook({ stateLook: 'frost' }));
  });
});
