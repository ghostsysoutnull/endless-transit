import { describe, expect, test } from 'vitest';
import { Address } from '#engine/model/Address.ts';

describe('Address — where a location is, as child indices from the universe', () => {
  test('the universe is "0"; every step down appends the child index', () => {
    const root = new Address([]);
    expect(root.toString()).toBe('0');
    expect(root.depth()).toBe(0);
    expect(root.child(3).child(0).child(12).toString()).toBe('0.3.0.12');
    expect(root.child(3).child(0).depth()).toBe(2);
    expect(root.child(3).child(1).indices()).toEqual([3, 1]);
  });

  test('round trip through the text form; identity is the path, not the object', () => {
    const address = new Address([2, 0, 7]);
    expect(Address.parse(address.toString())?.equals(address)).toBe(true);
    expect(address.equals(new Address([2, 0]))).toBe(false);
    expect(address.equals(new Address([2, 0, 8]))).toBe(false);
  });

  test('anything that is not a path from the universe parses to nothing', () => {
    for (const text of [
      '',
      '1',
      '1.2',
      '0.',
      '0..1',
      '0.-1',
      '0.1.5e3',
      '0.a',
      '0.1.2 ',
      'Universe',
      '0.99999999999999999999',
    ]) {
      expect(Address.parse(text), text).toBeUndefined();
    }
  });

  test('an index is a whole number from zero up', () => {
    expect(() => new Address([1.5])).toThrow(RangeError);
    expect(() => new Address([]).child(-1)).toThrow(RangeError);
  });
});
