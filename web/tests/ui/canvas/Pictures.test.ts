import { describe, expect, test } from 'vitest';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { MapPicture } from '#ui/canvas/MapPicture.ts';
import type { MapPictureVM } from '#ui/canvas/MapPictureVM.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

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

function texts(painter: RecordingPainter): string[] {
  return painter.calls
    .filter((call) => call.startsWith('fillText('))
    .map((call) => call.slice(9).split(',')[0] ?? '');
}

describe('the map picture: a pure function of its view-model — the same calls twice, every glyph drawn once, the legend drawn', () => {
  test('the draw calls are deterministic and complete', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    const picture = new MapPicture(new CanvasFont());
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
    const picture = new MapPicture(new CanvasFont());
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
    const picture = new MapPicture(new CanvasFont());
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
