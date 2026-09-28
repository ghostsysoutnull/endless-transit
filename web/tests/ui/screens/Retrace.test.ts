import { describe, expect, test } from 'vitest';
import { Retrace } from '#ui/screens/Retrace.ts';

/** A child of the picture: its option id and the address of the place it enters. */
function child(address: string): { id: string; address: string } {
  return { id: `enter:${address}`, address };
}

describe('the place the traveller came out of, found on the path to the screen before (U02, the zoom out)', () => {
  test('back up one level: the child left is the one on the path', () => {
    const retrace = new Retrace(['0', '0.1', '0.1.2']);
    expect(retrace.from('0.1', [child('0.1.0'), child('0.1.1'), child('0.1.2')])).toEqual(child('0.1.2'));
  });

  test('a picture that lists places a level down (a floor in the corridor lists its apartments): the one on the path', () => {
    const retrace = new Retrace(['0', '0.4', '0.4.0', '0.4.0.3', '0.4.0.3.1']);
    expect(retrace.from('0.4', [child('0.4.0.2'), child('0.4.0.3')])).toEqual(child('0.4.0.3'));
  });

  test('a new place down the path was not come out of: none', () => {
    const retrace = new Retrace(['0', '0.1']);
    expect(retrace.from('0.1.2', [child('0.1.2.0'), child('0.1.2.1')])).toBeUndefined();
  });

  test('the same place shown again was not come out of, even when it lists itself: none', () => {
    const retrace = new Retrace(['0', '0.1', '0.1.4']);
    expect(retrace.from('0.1.4', [child('0.1.3'), child('0.1.4')])).toBeUndefined();
  });

  test('the first screen has no path behind it: none', () => {
    expect(new Retrace([]).from('0', [child('0.0')])).toBeUndefined();
  });
});
