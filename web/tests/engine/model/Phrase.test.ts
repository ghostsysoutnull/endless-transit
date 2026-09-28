import { describe, expect, test } from 'vitest';
import { Phrase } from '#engine/model/Phrase.ts';

describe('a phrase shaped for the screen', () => {
  test('capitalised: the first letter a capital, the rest as it is; nothing to capitalise stays as it is', () => {
    expect(new Phrase('baroque').capitalised()).toBe('Baroque');
    expect(new Phrase('hydroponic bay').capitalised()).toBe('Hydroponic bay');
    expect(new Phrase('[STABLE]').capitalised()).toBe('[STABLE]');
    expect(new Phrase('').capitalised()).toBe('');
  });

  test('plain: lower case with a capital first letter, whatever case it came in', () => {
    expect(new Phrase('HYDROPONIC BAY').plain()).toBe('Hydroponic bay');
    expect(new Phrase('sTRATA').plain()).toBe('Strata');
  });

  test('two phrases of the same text are the same phrase', () => {
    expect(new Phrase('Void')).toEqual(new Phrase('Void'));
    expect(new Phrase('Void')).not.toEqual(new Phrase('void'));
  });
});
