import { describe, expect, test } from 'vitest';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Trait } from '#engine/model/Trait.ts';
import { Vibe } from '#engine/model/Vibe.ts';

const neon = new Culture('neon', 'bright-cyan');
const rust = new Culture('rust', 'red');
const analog = new Era('analog');
const entropic = new Era('entropic');
const planetVibe = new Vibe({ era: analog, culture: neon, secondCulture: rust, secondEra: entropic });

describe('domain values have identity by stable key', () => {
  test('two cultures, eras or traits with the same key are the same value', () => {
    expect(new Culture('neon', 'bright-cyan').equals(neon)).toBe(true);
    expect(neon.equals(rust)).toBe(false);
    expect(new Era('analog').equals(analog)).toBe(true);
    expect(analog.equals(entropic)).toBe(false);
    expect(new Trait('Military').equals(new Trait('Military'))).toBe(true);
    expect(new Trait('Military').equals(new Trait('Research'))).toBe(false);
  });
});

describe('Vibe — what a planet decides for everything below it', () => {
  test('a planet vibe: main culture and era, a second of each, 85% stability, no mutation, the frame of the main culture', () => {
    expect(planetVibe.culture()).toBe(neon);
    expect(planetVibe.era()).toBe(analog);
    expect(planetVibe.secondCulture()).toBe(rust);
    expect(planetVibe.secondEra()).toBe(entropic);
    expect(planetVibe.stability()).toBe(0.85);
    expect(planetVibe.mutation()).toBeUndefined();
    expect(planetVibe.frame()).toBe('bright-cyan');
  });

  test('a country mutates it: the trait is recorded, stability shifts and stays inside 0.1..0.9', () => {
    const military = new Trait('Military');
    const shifted = planetVibe.mutate(military, -0.1);
    expect(shifted.mutation()).toBe(military);
    expect(shifted.stability()).toBeCloseTo(0.75, 10);
    expect(planetVibe.mutate(military, 0.1).stability()).toBe(0.9);
    expect(planetVibe.mutate(military, -5).stability()).toBe(0.1);
    expect(shifted.culture()).toBe(neon);
    expect(shifted.frame()).toBe('bright-cyan');
    expect(planetVibe.mutation()).toBeUndefined();
  });

  test('a rebel district swaps both cultures and both eras; mutation, stability and the frame stay', () => {
    const country = planetVibe.mutate(new Trait('Research'), 0.02);
    const rebel = country.rebel();
    expect(rebel.culture()).toBe(rust);
    expect(rebel.secondCulture()).toBe(neon);
    expect(rebel.era()).toBe(entropic);
    expect(rebel.secondEra()).toBe(analog);
    expect(rebel.mutation()?.key()).toBe('Research');
    expect(rebel.stability()).toBe(country.stability());
    expect(rebel.frame()).toBe('bright-cyan');
  });
});
