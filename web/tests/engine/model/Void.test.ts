import { describe, expect, test } from 'vitest';
import { FragmentReader } from '#engine/model/FragmentReader.ts';
import { HiddenFrequency } from '#engine/model/HiddenFrequency.ts';
import type { Location } from '#engine/model/Location.ts';
import { NullReach } from '#engine/model/NullReach.ts';
import { SpectralEcho } from '#engine/model/SpectralEcho.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);
const universe = registry.universe(SEED);
const street = must(toStreet(universe, () => 0).at(-1));
/** Grand Power Plant, the first room behind the lobby's first door of Ornate Sanctum. */
const room = must(street.children()[0]?.children()[0]?.children()[0]?.children()[0]?.children()[0]);

/** The first Null Reach of the first filament of a world whose first filament has one. */
function reach(): NullReach {
  for (let n = 0; n < 40; n++) {
    const world = registry.universe(new Seed(n, n * 11));
    for (const filament of world.children()) {
      const found = filament.children().find((node) => node instanceof NullReach);
      if (found instanceof NullReach) return found;
    }
  }
  throw new Error('no Null Reach in forty worlds');
}

describe('the Hidden Frequency lottery (Guide:186-190; Room.groovy:69-78)', () => {
  test('a room rolls once per step: three in ten steps win, a fragment worth one to ten million hertz, fixed by the room and the step', () => {
    let wins = 0;
    for (let step = 0; step < 2000; step++) {
      const fragment = room.lottery(step);
      if (fragment === undefined) continue;
      wins++;
      expect(fragment).toBeInstanceOf(HiddenFrequency);
      expect(fragment.name()).toBe('Hidden Frequency');
      expect(fragment.frequency().hertz()).toBeGreaterThanOrEqual(1_000_000);
      expect(fragment.frequency().hertz()).toBeLessThanOrEqual(9_999_999);
      expect(fragment.resonant()).toBe(false);
      expect(fragment.key()).toBe(`hidden(${room.address().toString()}@${String(step)})`);
      expect(fragment.data()).toEqual({ kind: 'hidden', from: room.address().toString(), steps: step });
      expect(must(room.lottery(step)).frequency().hertz()).toBe(fragment.frequency().hertz());
    }
    expect(wins / 2000).toBeGreaterThan(0.26);
    expect(wins / 2000).toBeLessThan(0.34);
    // Every kind above a room rolls nothing.
    expect(street.lottery(3)).toBeUndefined();
    expect(must(room.parent()).lottery(3)).toBeUndefined();
  });

  test('the reader: a Hidden Frequency comes back from the room and the step that won it; a step that did not win, or another place, is refused', () => {
    const reader = new FragmentReader();
    const step = Array.from({ length: 100 }, (_, n) => n).find((n) => room.lottery(n) !== undefined);
    const lost = Array.from({ length: 100 }, (_, n) => n).find((n) => room.lottery(n) === undefined);
    const won = must(room.lottery(must(step)));
    const back = must(reader.read(won.data(), universe));
    expect(back.key()).toBe(won.key());
    expect(back.frequency().hertz()).toBe(won.frequency().hertz());
    expect(
      reader.read({ kind: 'hidden', from: room.address().toString(), steps: lost }, universe),
    ).toBeUndefined();
    expect(
      reader.read({ kind: 'hidden', from: street.address().toString(), steps: step }, universe),
    ).toBeUndefined();
    expect(
      reader.read({ kind: 'hidden', from: room.address().toString(), steps: '3' }, universe),
    ).toBeUndefined();
    expect(reader.read({ kind: 'hidden', from: room.address().toString() }, universe)).toBeUndefined();
  });
});

describe('the Null Reach echo (Guide:116, 192-195; NullSector.groovy:25-30, 84-113)', () => {
  test('the echo: worth 1,000 to 9,999 Hz, fixed by the reach; each scan adds 10 to 39, fixed by the reach and the step; locked at 100; captured once, ever', () => {
    const void_ = reach();
    const echo = must(void_.echo());
    expect(echo.signal()).toBe(0);
    expect(echo.locked()).toBe(false);
    expect(echo.found()).toBe(false);
    expect(echo.capture()).toBeUndefined();
    expect(void_.status()).toBe('SIGNAL: [SCAN_REQUIRED]');
    expect(void_.facts()).toEqual([
      { key: 'signal', label: 'VOID_STATUS', value: 'Searching for signals...' },
    ]);
    const twin = must((reach() as Location).echo());
    const readings: number[] = [];
    for (let step = 0; !echo.locked(); step++) {
      const before = echo.signal();
      const after = echo.scan(step);
      expect(after).toBe(echo.signal());
      expect(after - before).toBeGreaterThanOrEqual(10);
      expect(after - before <= 39 || after === 100).toBe(true);
      readings.push(after);
      expect(twin.scan(step)).toBe(after);
      expect(void_.status()).toBe(`SIGNAL: ${String(after)}%`);
    }
    expect(readings.length).toBeGreaterThanOrEqual(3);
    expect(readings.length).toBeLessThanOrEqual(10);
    expect(echo.signal()).toBe(100);
    expect(void_.facts()[0]?.value).toBe(
      `SIGNAL_STRENGTH: 100% | FREQ_DRIFT: ${String(echo.fragment().frequency().hertz())}Hz`,
    );
    expect(echo.scan(99)).toBe(100);
    const capture = must(echo.capture());
    expect(capture.fresh).toBe(true);
    expect(capture.fragment).toBeInstanceOf(SpectralEcho);
    expect(capture.fragment.name()).toBe('Spectral Echo');
    expect(capture.fragment.frequency().hertz()).toBeGreaterThanOrEqual(1000);
    expect(capture.fragment.frequency().hertz()).toBeLessThanOrEqual(9999);
    expect(capture.fragment.key()).toBe(`echo(${void_.address().toString()})`);
    expect(capture.fragment.data()).toEqual({ kind: 'echo', from: void_.address().toString() });
    expect(echo.found()).toBe(true);
    expect(echo.signal()).toBe(0);
    expect(echo.capture()).toBeUndefined();
    expect(echo.scan(5)).toBe(0);
    expect(void_.description()).toEqual(['A silent void. The spectral resonance has been harvested.']);
    expect(void_.status()).toBe('SIGNAL: [HARVESTED]');
    // Every other kind has no echo.
    expect(street.echo()).toBeUndefined();
    expect(universe.echo()).toBeUndefined();
  });

  test('the reach remembers the signal and whether its echo was taken (Guide:369-370 said the save did not); recall takes back only what it could have written', () => {
    const void_ = reach();
    expect(void_.remember()).toBeUndefined();
    const echo = must(void_.echo());
    echo.scan(0);
    expect(void_.remember()).toBe(`{"signal":${String(echo.signal())}}`);
    while (!echo.locked()) echo.scan(1);
    echo.capture();
    expect(void_.remember()).toBe('{"found":true}');
    const twin = reach();
    expect(twin.recall('{"found":true}')).toBe(true);
    expect(twin.remember()).toBe('{"found":true}');
    expect(must(twin.echo()).capture()).toBeUndefined();
    const other = reach();
    expect(other.recall('{"signal":57}')).toBe(true);
    expect(must(other.echo()).signal()).toBe(57);
    expect(other.recall('{"signal":100}')).toBe(true);
    expect(must(other.echo()).locked()).toBe(true);
    for (const bad of [
      '{}',
      '',
      'x',
      '{"signal":0}',
      '{"signal":101}',
      '{"signal":-5}',
      '{"signal":1.5}',
      '{"signal":"57"}',
      '{"found":false}',
      '{"found":true,"signal":57}',
      '{"echo":1}',
    ]) {
      const fresh = reach();
      expect(fresh.recall(bad), bad).toBe(false);
      expect(fresh.remember(), bad).toBeUndefined();
    }
  });

  test('the reader: an echo comes back from its reach whether or not it has been taken; a street, a room or a made-up address is refused', () => {
    const void_ = reach();
    const reader = new FragmentReader();
    const world = void_.root();
    const back = must(reader.read({ kind: 'echo', from: void_.address().toString() }, world));
    expect(back.key()).toBe(`echo(${void_.address().toString()})`);
    expect(back.frequency().hertz()).toBe(must(void_.echo()).fragment().frequency().hertz());
    expect(reader.read({ kind: 'echo', from: world.address().toString() }, world)).toBeUndefined();
    expect(reader.read({ kind: 'echo', from: '0.99' }, world)).toBeUndefined();
    expect(reader.read({ kind: 'echo' }, world)).toBeUndefined();
  });
});
