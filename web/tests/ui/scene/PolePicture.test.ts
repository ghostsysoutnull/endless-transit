import { describe, expect, test } from 'vitest';
import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import { PoleLayout } from '#ui/scene/PoleLayout.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import type { PoleLevelVM, PoleVM } from '#ui/screens/PoleVM.ts';
import { heldPoleLevel, poleLevel } from '#tests/support/poleLevel.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

const PHONE = { width: 360, height: 560 };
const GLYPHS: readonly GlyphLook[] = [
  'universe',
  'filament',
  'sector',
  'null-reach',
  'system',
  'planet',
  'country',
  'city',
  'street',
  'building',
  'floor',
  'corridor',
  'apartment',
  'room',
];

/** Every glyph once, the vibe set from the planet down, a rebel, a drift, tags and berths: all the pole draws. */
function pole(): PoleVM {
  const levels = GLYPHS.map((glyph, index): PoleLevelVM =>
    (index < 5 ? poleLevel : heldPoleLevel)({
      key: String(index),
      glyph,
      abyssal: glyph === 'room',
      here: index === GLYPHS.length - 1,
      kind: 'Galactic sector',
      name: 'A name far too long to fit beside its plate on a phone',
      label: `Level ${String(index)}`,
      rebel: glyph === 'city',
      drift: { era: false, culture: glyph === 'apartment' },
      berth: glyph === 'planet',
      tags:
        glyph === 'apartment'
          ? [
              { word: 'drift', look: 'drift' },
              { word: 'cold', look: 'door' },
            ]
          : [],
    }),
  );
  return {
    group: 'View',
    pole: 'Pole',
    column: 'Column',
    heads: { era: 'Era', culture: 'Culture', trait: 'Trait' },
    currentHead: 'Drift current',
    looks: { rebel: 'rebel', drift: 'drift' },
    levels,
  };
}

function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

/** The moment: the clock, whether it holds still, the pole seen from the top, the focus settled on a level. */
function at(seconds: number, still: boolean, level = 7) {
  return {
    seconds,
    still,
    reveal: 1,
    window: { top: 0, height: PHONE.height },
    focus: { level, from: level, progress: 1 },
  };
}

describe('PolePicture — the pole painted (U05, reworked)', () => {
  const picture = new ScenePictures().pole();
  const vm = pole();
  const layout = PoleLayout.of(vm.levels, PHONE);

  test('painted the same way twice; every word at 12 px or more, in a text ink; every ink one the pictures may use', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    picture.paint(one, vm, layout, palette(one.asked), at(3.2, false));
    picture.paint(two, vm, layout, palette(two.asked), at(3.2, false));
    expect(one.calls).toEqual(two.calls);
    const written = one.calls.filter((call) => call.startsWith('fillText('));
    expect(written.length).toBeGreaterThan(GLYPHS.length * 3);
    for (const call of written) {
      const px = /(\d+(?:\.\d+)?)px/.exec(call)?.[1];
      expect(Number(px), call).toBeGreaterThanOrEqual(12);
      expect(TEXT_INKS.includes(/<([\w-]+)>/.exec(call)?.[1] ?? ''), call).toBe(true);
    }
    expect(
      [...one.asked].filter((token) => !TEXT_INKS.includes(token) && !SURFACE_INKS.includes(token)),
    ).toEqual([]);
  });

  test('a name too long for its row is cut with an ellipsis', () => {
    const painter = new RecordingPainter();
    picture.paint(painter, vm, layout, palette(painter.asked), at(0, true));
    const names = painter.calls.filter((call) => call.startsWith('fillText(A name'));
    expect(names).toHaveLength(GLYPHS.length);
    for (const name of names) expect(name).toContain('…');
  });

  test('the backdrop writes the vibe in force at the level in focus, big; above the planet, nothing held', () => {
    const big = (level: number) => {
      const painter = new RecordingPainter();
      picture.paint(painter, vm, layout, palette(painter.asked), at(0, true, level));
      return painter.calls
        .filter((call) => Number(/(\d+(?:\.\d+)?)px/.exec(call)?.[1]) > 40)
        .map((call) => /^fillText\(([^,]+),/.exec(call)?.[1]);
    };
    expect(big(7)).toEqual(['ATOMIC', 'RUST', 'COMMERCIAL']);
    expect(big(2)).toEqual(['—', '—', '—']);
  });

  test('held still, the clock moves nothing', () => {
    const early = new RecordingPainter();
    const late = new RecordingPainter();
    picture.paint(early, vm, layout, palette(early.asked), at(0, true));
    picture.paint(late, vm, layout, palette(late.asked), at(5.7, true));
    expect(early.calls).toEqual(late.calls);
  });
});
