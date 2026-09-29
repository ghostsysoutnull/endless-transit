import { describe, expect, test } from 'vitest';
import { Level } from '#engine/model/Level.ts';

describe('a level is a value: its number and what stands there', () => {
  test('two levels of the same number and kind are the same level; another number makes another', () => {
    expect(new Level(3, 'floor')).toEqual(new Level(3, 'floor'));
    expect(new Level(3, 'floor')).not.toEqual(new Level(4, 'floor'));
    expect(new Level(-1, 'layer')).not.toEqual(new Level(-2, 'layer'));
  });

  test('a floor stands at the lobby or above, a Layer below it: any other pair is refused', () => {
    expect(() => new Level(-1, 'floor')).toThrow(RangeError);
    expect(() => new Level(0, 'layer')).toThrow(RangeError);
    expect(() => new Level(4, 'layer')).toThrow(RangeError);
  });

  test('a Layer lies below the bedrock; the lobby and every floor above it do not', () => {
    expect(new Level(-1, 'layer').belowBedrock()).toBe(true);
    expect(new Level(0, 'floor').belowBedrock()).toBe(false);
  });

  test('a floor’s label is its number; a Layer’s is its number in hex, as the game names it', () => {
    expect(new Level(0, 'floor').label()).toBe('0');
    expect(new Level(12, 'floor').label()).toBe('12');
    expect(new Level(-1, 'layer').label()).toBe('-0x1');
    expect(new Level(-26, 'layer').label()).toBe('-0x1A');
  });
});
