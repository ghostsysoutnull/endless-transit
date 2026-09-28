import { describe, expect, test } from 'vitest';
import { Phrase } from '#engine/model/Phrase.ts';

describe('a phrase shaped for the screen', () => {
  test('capitalised: the first letter a capital, the rest as it is; nothing to capitalise stays as it is', () => {
    expect(new Phrase('baroque').capitalised()).toBe('Baroque');
    expect(new Phrase('hydroponic bay').capitalised()).toBe('Hydroponic bay');
    expect(new Phrase('[STABLE]').capitalised()).toBe('[STABLE]');
    expect(new Phrase('').capitalised()).toBe('');
  });
});
