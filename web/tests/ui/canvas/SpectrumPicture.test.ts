import { describe, expect, test } from 'vitest';
import { Seed } from '#engine/rng/Seed.ts';
import { SpectrumPicture } from '#ui/canvas/SpectrumPicture.ts';
import type { SpectrumVM } from '#ui/canvas/SpectrumVM.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

const SIZE = { width: 300, height: 80 };
const palette = (token: string): string => `<${token}>`;

function spectrum(parts: Partial<SpectrumVM> = {}): SpectrumVM {
  return {
    anchors: [3, 3, 3, 3, 3],
    tallest: 9,
    noise: Seed.parse('7F3A-91C2-0B4D-E6A8') ?? new Seed(1, 2),
    peaks: [],
    glitched: false,
    ...parts,
  };
}

/** The top of every bar drawn in the bloomed pass, left to right: the `rect` calls between `beginPath` and `fill`. */
function barTops(vm: SpectrumVM, phase = 0.25): number[] {
  const painter = new RecordingPainter();
  new SpectrumPicture().paint(painter, vm, SIZE, palette, phase);
  const start = painter.calls.indexOf('beginPath()');
  const end = painter.calls.indexOf('fill()', start);
  return painter.calls
    .slice(start + 1, end)
    .filter((call) => call.startsWith('rect('))
    .map((call) => Number(call.slice(5, -1).split(',')[1]));
}

describe('SpectrumPicture — the quantum spectrogram as a scope (U03e)', () => {
  test('the same frame at the same phase is the same picture: no clock, no dice', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    new SpectrumPicture().paint(one, spectrum(), SIZE, palette, 0.4);
    new SpectrumPicture().paint(two, spectrum(), SIZE, palette, 0.4);
    expect(one.calls).toEqual(two.calls);
    expect(one.calls.length).toBeGreaterThan(40);
  });

  test('another frame of the game draws another floor', () => {
    expect(barTops(spectrum())).not.toEqual(barTops(spectrum({ noise: new Seed(9, 9) })));
  });

  test('an object stands out of the floor as a peak where its frequency sits; the floor itself stays low', () => {
    const flat = barTops(spectrum());
    const peaked = barTops(spectrum({ peaks: [{ position: 0.5, resonant: true }] }));
    const middle = Math.floor(peaked.length / 2);
    // A smaller top is a taller bar.
    expect(peaked[middle]).toBeLessThan((flat[middle] ?? 0) - 20);
    expect(peaked[0]).toBe(flat[0]);
    expect(peaked[peaked.length - 1]).toBe(flat[flat.length - 1]);
    for (const top of flat) expect(top).toBeGreaterThan(SIZE.height * 0.4);
  });

  test('a glitched reading tears: slices of the picture are drawn again, shifted', () => {
    const calm = new RecordingPainter();
    const torn = new RecordingPainter();
    new SpectrumPicture().paint(calm, spectrum(), SIZE, palette, 0.1);
    new SpectrumPicture().paint(torn, spectrum({ glitched: true }), SIZE, palette, 0.1);
    expect(calm.calls.filter((call) => call === 'clip()')).toHaveLength(0);
    expect(torn.calls.filter((call) => call === 'clip()')).toHaveLength(3);
  });
});
