import { describe, expect, test } from 'vitest';
import { Coherence } from '#engine/rules/Coherence.ts';

describe('Coherence — the one resource, as a value (Guide:43, 133-156)', () => {
  test('starts at 100 (Guide:43); a value is a whole number from 0 to 100', () => {
    expect(new Coherence().value()).toBe(100);
    expect(new Coherence(37).value()).toBe(37);
    for (const bad of [-1, 101, 0.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => new Coherence(bad), String(bad)).toThrow(RangeError);
    }
  });

  test('draining stops at zero and restoring is capped at 100 (Player.groovy:50-52); a value never changes', () => {
    const full = new Coherence();
    expect(full.drained(1).value()).toBe(99);
    expect(full.drained(4).value()).toBe(96);
    expect(full.value()).toBe(100);
    expect(new Coherence(1).drained(2).value()).toBe(0);
    expect(new Coherence(0).drained(1).value()).toBe(0);
    expect(new Coherence(90).restored(15).value()).toBe(100);
    expect(new Coherence(85).restored(15).value()).toBe(100);
    expect(new Coherence(84).restored(15).value()).toBe(99);
    expect(new Coherence(0).restored(100).value()).toBe(100);
  });

  test('exhausted at zero and only there (Guide:144, TurnProcessor.groovy:55)', () => {
    expect(new Coherence(0).exhausted()).toBe(true);
    expect(new Coherence(1).exhausted()).toBe(false);
    expect(new Coherence(1).drained(1).exhausted()).toBe(true);
  });

  test('the bands at their exact edges (Guide:151-156, HUDHeaderComponent.groovy:146-148): 70 and up stable, 30 to 69 degraded, under 30 critical', () => {
    expect(new Coherence(100).band()).toBe('stable');
    expect(new Coherence(70).band()).toBe('stable');
    expect(new Coherence(69).band()).toBe('degraded');
    expect(new Coherence(30).band()).toBe('degraded');
    expect(new Coherence(29).band()).toBe('critical');
    expect(new Coherence(0).band()).toBe('critical');
  });

  test('the description starts corrupting under 40 (Guide:155, NarrativePaneComponent.groovy:25)', () => {
    expect(new Coherence(40).corrupting()).toBe(false);
    expect(new Coherence(39).corrupting()).toBe(true);
    expect(new Coherence(0).corrupting()).toBe(true);
  });

  test('identity is the value', () => {
    expect(new Coherence(50).equals(new Coherence(50))).toBe(true);
    expect(new Coherence(50).equals(new Coherence(51))).toBe(false);
  });
});
