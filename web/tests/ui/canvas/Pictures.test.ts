import { describe, expect, test } from 'vitest';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import { MapPicture } from '#ui/canvas/MapPicture.ts';
import type { MapPictureVM } from '#ui/canvas/MapPictureVM.ts';
import { TracePicture } from '#ui/canvas/TracePicture.ts';
import type { TracePictureVM } from '#ui/canvas/TracePictureVM.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';
import { must } from '#tests/support/world.ts';

/** The palette a test paints with: the token's name, so every call says which ink it used. */
function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

const MAP: MapPictureVM = {
  width: 30,
  height: 15,
  origin: { glyph: '▲', label: 'YOU' },
  nodes: [
    { x: 7, y: 12, glyph: '⌂', tone: 'unvisited' },
    { x: 15, y: 7, glyph: '⌂', tone: 'visited' },
    { x: 12, y: 2, glyph: '▒', tone: 'noise' },
  ],
  marks: [{ x: 5, y: 11 }],
  markGlyph: 'X',
  legend: [
    { glyph: '▲', label: 'YOU', tone: 'you' },
    { glyph: '⌂', label: 'VISITED', tone: 'visited' },
    { glyph: '⌂', label: 'UNVISITED', tone: 'unvisited' },
    { glyph: 'X', label: 'GLITCH', tone: 'mark' },
  ],
};

const TRACE: TracePictureVM = {
  rows: [
    {
      depth: '[00]',
      glyph: '∞',
      kind: 'UNIVERSE',
      name: 'The Endless Universe',
      current: false,
      abyssal: false,
    },
    {
      depth: '[01]',
      glyph: '»',
      kind: 'COSMIC FILAMENT',
      name: 'Zeta-915-Link',
      current: false,
      abyssal: false,
    },
    { depth: '[01]', glyph: '▤', kind: 'LAYER', name: 'Layer -0x1', current: false, abyssal: true },
    {
      depth: '[02]',
      glyph: '☠',
      kind: 'SHARD',
      name: 'Inverted Processing Core',
      current: true,
      abyssal: true,
    },
  ],
};

function texts(painter: RecordingPainter): string[] {
  return painter.calls
    .filter((call) => call.startsWith('fillText('))
    .map((call) => call.slice(9).split(',')[0] ?? '');
}

describe('the map picture: a pure function of its view-model — the same calls twice, every glyph drawn once, the legend drawn', () => {
  test('the draw calls are deterministic and complete', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    const picture = new MapPicture();
    const size = { width: 300, height: picture.height(MAP, 300) };
    picture.paint(one, MAP, size, palette(one.asked), 0.5);
    picture.paint(two, MAP, size, palette(two.asked), 0.5);
    expect(one.calls).toEqual(two.calls);
    expect(one.calls.length).toBeGreaterThan(30);
    const drawn = texts(one);
    // Every node's glyph, the mark, the origin, and the legend — each glyph beside its word.
    expect(drawn.filter((text) => text === '⌂')).toHaveLength(4); // two nodes, two legend entries
    expect(drawn.filter((text) => text === '▒')).toHaveLength(1);
    expect(drawn.filter((text) => text === 'X')).toHaveLength(2); // the mark and its legend entry
    expect(drawn.filter((text) => text === '▲')).toHaveLength(2); // the origin and its legend entry
    expect(drawn).toEqual(expect.arrayContaining(['YOU', 'VISITED', 'UNVISITED', 'GLITCH']));
    // Text is never smaller than 12 px.
    for (const call of one.calls.filter((each) => each.startsWith('fillText('))) {
      const px = /(\d+(?:\.\d+)?)px/.exec(call)?.[1];
      expect(Number(px), call).toBeGreaterThanOrEqual(12);
    }
  });

  test('a visited node is painted in the frame ink, an unvisited one dim, the static red, the mark magenta, the origin yellow', () => {
    const painter = new RecordingPainter();
    const picture = new MapPicture();
    picture.paint(
      painter,
      MAP,
      { width: 300, height: picture.height(MAP, 300) },
      palette(painter.asked),
      0.5,
    );
    const ink = (glyph: string): string[] =>
      painter.calls
        .filter((call) => call.startsWith(`fillText(${glyph},`))
        .map((call) => /<(\w+)>/.exec(call)?.[1] ?? '');
    expect(ink('⌂')).toEqual(['dim', 'frame', 'frame', 'dim']);
    expect(ink('▒')).toEqual(['rd']);
    expect(ink('X')).toEqual(['mg', 'mg']);
    expect(ink('▲')).toEqual(['yl', 'yl']);
    expect(
      [...painter.asked].every((token) => TEXT_INKS.includes(token) || SURFACE_INKS.includes(token)),
    ).toBe(true);
  });

  test('the picture is as wide as its panel and half as tall plus the legend; a phase moves only the pulse', () => {
    const picture = new MapPicture();
    expect(picture.height(MAP, 300)).toBe(174);
    expect(picture.height(MAP, 660)).toBe(354);
    const still = new RecordingPainter();
    const moving = new RecordingPainter();
    picture.paint(still, MAP, { width: 300, height: 174 }, palette(still.asked), 0);
    picture.paint(moving, MAP, { width: 300, height: 174 }, palette(moving.asked), 0.9);
    // The pulse is three rings: their arcs and their strokes (the alpha fades with the ring) are all that moves.
    const pulse = (call: string): boolean => call.startsWith('arc(') || call.startsWith('stroke(<yl>');
    expect(still.calls.filter((call) => !pulse(call))).toEqual(moving.calls.filter((call) => !pulse(call)));
    expect(still.calls.filter(pulse)).not.toEqual(moving.calls.filter(pulse));
    expect(still.calls.filter(pulse)).toHaveLength(6);
  });
});

describe('the trace picture: one plate per level on a thread, the current one marked, the void in its own ink', () => {
  test('the draw calls are deterministic; every depth, kind and name is written at 12 px or more', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    const picture = new TracePicture();
    const size = { width: 336, height: picture.height(TRACE, 336) };
    picture.paint(one, TRACE, size, palette(one.asked), 0.5);
    picture.paint(two, TRACE, size, palette(two.asked), 0.5);
    expect(one.calls).toEqual(two.calls);
    const drawn = texts(one);
    expect(drawn).toEqual(
      expect.arrayContaining([
        '[00]',
        'UNIVERSE',
        'The Endless Universe',
        '[02]',
        'SHARD',
        'Inverted Processing Core',
        '∞',
        '»',
        '☠',
      ]),
    );
    for (const call of one.calls.filter((each) => each.startsWith('fillText('))) {
      const px = /(\d+(?:\.\d+)?)px/.exec(call)?.[1];
      expect(Number(px), call).toBeGreaterThanOrEqual(12);
    }
    expect(picture.height(TRACE, 336)).toBe(4 * 34 + 24);
    expect([...one.asked].every((token) => TEXT_INKS.includes(token) || SURFACE_INKS.includes(token))).toBe(
      true,
    );
  });

  test('the current level is written in yellow, a void level in the void’s ink — the void wins when both (LatticeTraceComponent.groovy:84) — the rest in the text ink; a long name is cut to the width', () => {
    const painter = new RecordingPainter();
    const picture = new TracePicture();
    const long: TracePictureVM = {
      rows: [
        { depth: '[00]', glyph: '∞', kind: 'UNIVERSE', name: 'A'.repeat(80), current: false, abyssal: false },
      ],
    };
    picture.paint(
      painter,
      TRACE,
      { width: 336, height: picture.height(TRACE, 336) },
      palette(painter.asked),
      0.5,
    );
    const inkOf = (text: string): string =>
      /<(\w+)>/.exec(painter.calls.find((call) => call.startsWith(`fillText(${text},`)) ?? '')?.[1] ?? '';
    expect(inkOf('The Endless Universe')).toBe('text');
    expect(inkOf('Zeta-915-Link')).toBe('text');
    expect(inkOf('Layer -0x1')).toBe('ab');
    expect(inkOf('Inverted Processing Core')).toBe('ab');
    expect(inkOf('☠')).toBe('ab');
    // The current line is bold; the ring pulses around its plate.
    expect(painter.calls.find((call) => call.startsWith('fillText(Inverted Processing Core,'))).toContain(
      '700 12px',
    );
    expect(painter.calls.filter((call) => call.startsWith('arc('))).toHaveLength(4 * 2 + 1);
    const above = new RecordingPainter();
    picture.paint(
      above,
      { rows: [{ ...must(TRACE.rows[0]), current: true }] },
      { width: 336, height: picture.height(TRACE, 336) },
      palette(above.asked),
      0.5,
    );
    expect(
      /<(\w+)>/.exec(
        above.calls.find((call) => call.startsWith('fillText(The Endless Universe,')) ?? '',
      )?.[1],
    ).toBe('yl');
    const narrow = new RecordingPainter();
    picture.paint(
      narrow,
      long,
      { width: 200, height: picture.height(long, 200) },
      palette(narrow.asked),
      0.5,
    );
    const cut = texts(narrow).find((text) => text.startsWith('AAA')) ?? '';
    expect(cut.length).toBeLessThan(80);
    expect(cut.endsWith('…')).toBe(true);
  });
});
