import { describe, expect, test } from 'vitest';
import { Buffer } from '#engine/rules/Buffer.ts';
import { fragment } from '#tests/support/fragment.ts';

describe('Buffer — the quantum trace buffer (Guide:236-243; no limit, U03d)', () => {
  test('empty at birth; holds every fragment added, past the old sixteen, in the order they came', () => {
    const buffer = new Buffer();
    expect(buffer.size()).toBe(0);
    for (let n = 0; n < 40; n++) buffer.add(fragment(`Item ${String(n)}`, n + 1));
    expect(buffer.size()).toBe(40);
    expect(buffer.fragments()[39]?.name()).toBe('Item 39');
    expect(new Buffer(Array.from({ length: 40 }, (_, n) => fragment('x', n))).size()).toBe(40);
  });

  test('take removes the fragment at that position and hands it over; nothing at a position nobody holds', () => {
    const buffer = new Buffer([fragment('A', 1), fragment('B', 2), fragment('C', 3)]);
    expect(buffer.take(1)?.name()).toBe('B');
    expect(buffer.fragments().map((each) => each.name())).toEqual(['A', 'C']);
    expect(buffer.take(2)).toBeUndefined();
    expect(buffer.take(-1)).toBeUndefined();
    expect(buffer.take(0.5)).toBeUndefined();
    expect(buffer.size()).toBe(2);
  });

  test('merge takes two out and puts the hybrid in last — first pick first in the name (Guide:241-243); two positions that are not two fragments merge nothing', () => {
    const buffer = new Buffer([
      fragment('Rusted Chain', 33),
      fragment('Paper Lantern', 88),
      fragment('Bone Flute', 5),
    ]);
    const hybrid = buffer.merge(1, 0);
    expect(hybrid?.name()).toBe('Paper-Rusted Hybrid');
    expect(hybrid?.frequency().hertz()).toBe(121);
    expect(buffer.fragments().map((each) => each.name())).toEqual(['Bone Flute', 'Paper-Rusted Hybrid']);
    expect(buffer.merge(0, 0)).toBeUndefined();
    expect(buffer.merge(0, 2)).toBeUndefined();
    expect(buffer.merge(-1, 0)).toBeUndefined();
    expect(buffer.size()).toBe(2);
    expect(buffer.merge(0, 1)?.name()).toBe('Bone-Paper-Rusted Hybrid'); // a hybrid's first word is its whole dash-joined head (SynthesisService.groovy:21)
    expect(buffer.size()).toBe(1);
    expect(buffer.merge(0, 1)).toBeUndefined();
  });
});
