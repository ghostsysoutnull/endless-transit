import { describe, expect, test } from 'vitest';
import { Frequency } from '#engine/model/Frequency.ts';
import { Gematria } from '#engine/model/Gematria.ts';

describe('Gematria — a name adds up (Guide:180-185, Gematria.groovy:11-33)', () => {
  test('the consonants at their alphabet positions, vowels nothing, anything else nothing', () => {
    expect(new Gematria('Rusted Chain').sum()).toBe(86); // R18 s19 t20 d4 C3 h8 n14
    expect(new Gematria('aeiou AEIOU').sum()).toBe(0);
    expect(new Gematria('b').sum()).toBe(2);
    expect(new Gematria('Z').sum()).toBe(26);
    expect(new Gematria('y').sum()).toBe(25); // y is a consonant here, as in the old game
    expect(new Gematria('x-ray 9!').sum()).toBe(24 + 18 + 25);
    expect(new Gematria('').sum()).toBe(0);
  });

  test('a master number — 11, 22 or 33 — is doubled before the depth', () => {
    expect(new Gematria('K').master()).toBe(true); // 11
    expect(new Gematria('V').master()).toBe(true); // 22
    expect(new Gematria('KV').master()).toBe(true); // 33
    expect(new Gematria('L').master()).toBe(false); // 12
    expect(new Gematria('K').frequencyAt(12).hertz()).toBe(264);
    expect(new Gematria('L').frequencyAt(12).hertz()).toBe(144);
  });

  test('the frequency is the sum times the depth; every room sits at depth 12', () => {
    expect(new Gematria('Rusted Chain').frequencyAt(12)).toEqual(new Frequency(1032));
    expect(new Gematria('plasma coil with reliquary box').frequencyAt(12).hertz()).toBe(2904);
    expect(new Gematria('Rusted Chain').frequencyAt(1).hertz()).toBe(86);
  });
});

describe('Frequency — hertz as a value (SpectralFrequency.groovy:11-22)', () => {
  test('a whole number of hertz, never negative', () => {
    expect(new Frequency(0).hertz()).toBe(0);
    expect(() => new Frequency(-1)).toThrow(RangeError);
    expect(() => new Frequency(1.5)).toThrow(RangeError);
  });

  test('the 10% of a matching culture, whole hertz, never rounded up (Guide:182-184; Room.groovy:169)', () => {
    expect(new Frequency(2904).amplified().hertz()).toBe(3194); // 3194.4
    expect(new Frequency(1032).amplified().hertz()).toBe(1135); // 1135.2
    expect(new Frequency(10).amplified().hertz()).toBe(11);
    expect(new Frequency(9).amplified().hertz()).toBe(9); // 9.9
  });

  test('a merge sums (Guide:241; SynthesisService.groovy:18)', () => {
    expect(new Frequency(33).plus(new Frequency(88))).toEqual(new Frequency(121));
  });

  test('resonant is "divides by 11" — and never 0 Hz: a Keystone is not resonant (Decision 7, HK-023)', () => {
    for (const hertz of [11, 22, 44, 55, 121])
      expect(new Frequency(hertz).resonant(), String(hertz)).toBe(true);
    for (const hertz of [0, 1, 10, 12, 120])
      expect(new Frequency(hertz).resonant(), String(hertz)).toBe(false);
  });

  test('equality is by value', () => {
    expect(new Frequency(7).equals(new Frequency(7))).toBe(true);
    expect(new Frequency(7).equals(new Frequency(8))).toBe(false);
  });
});
