import { describe, expect, test } from 'vitest';
import { Passage } from '#engine/model/Passage.ts';
import { doorLook } from '#tests/support/doorLook.ts';

const FROZEN = doorLook({ state: 'Frozen', stateLook: 'frost' });

describe('a floor’s corridor-to-be is a value: equal by its shape and its doors’ looks, in order', () => {
  test('two passages of the same shape and looks are the same passage', () => {
    expect(new Passage('curved', [doorLook(), FROZEN])).toEqual(new Passage('curved', [doorLook(), FROZEN]));
  });

  test('a passage differs by its shape, by a door’s look, by the doors’ order and by their number', () => {
    const passage = new Passage('curved', [doorLook(), FROZEN]);
    expect(passage).not.toEqual(new Passage('long', [doorLook(), FROZEN]));
    expect(passage).not.toEqual(new Passage('curved', [doorLook(), doorLook()]));
    expect(passage).not.toEqual(new Passage('curved', [FROZEN, doorLook()]));
    expect(passage).not.toEqual(new Passage('curved', [doorLook()]));
  });

  test('it keeps the looks it was made with, whatever becomes of the list it was handed', () => {
    const looks = [doorLook()];
    const passage = new Passage('long', looks);
    looks.push(FROZEN);
    expect(passage.doors()).toBe(1);
    expect(passage).toEqual(new Passage('long', [doorLook()]));
  });
});
