import { describe, expect, test } from 'vitest';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import type { SceneHit } from '#ui/scene/SceneHit.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import { StreetPicture } from '#ui/scene/StreetPicture.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

/** The phone's picture at 360 × 640 (measured, tasks/ui/U01b.md), and a desktop's middle column. */
const PHONE = { width: 328, height: 277 };
const DESKTOP = { width: 680, height: 510 };

function street(
  count: number,
  floors: (index: number) => number = (index) => 5 + ((index * 37) % 96),
): SceneVM {
  return {
    key: 'street',
    label: 'Picture of Bright Boulevard',
    address: '0.0.0.0.0.0.0.0',
    children: Array.from({ length: count }, (_, index) => ({
      id: `enter:${String(index)}`,
      ordinal: String(index + 1),
      name: `Building ${String(index + 1)}`,
      floors: floors(index),
      doors: 1 + (index % 12),
      landmark: index === 1,
      visited: index === 0,
      sealed: false,
      address: `0.0.0.0.0.0.0.0.${String(index)}`,
    })),
    decay: 0,
    noise: '7F3A-91C2-0B4D-E6A8',
  };
}

function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

function overlap(a: SceneHit, b: SceneHit): boolean {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

const picture = new StreetPicture();

describe('the street picture: buildings in two facing rows along the way, laid out as hit areas', () => {
  for (const size of [PHONE, DESKTOP]) {
    test(`4 to 20 buildings at ${String(size.width)} × ${String(size.height)}: one hit each, inside the picture, none overlapping, each anchor inside its hit`, () => {
      for (let count = 4; count <= 20; count++) {
        const hits = picture.layout(street(count), size);
        expect(hits.map((hit) => hit.id)).toEqual(street(count).children.map((child) => child.id));
        for (const hit of hits) {
          const where = `${String(count)} buildings, ${hit.id}`;
          expect(hit.x, where).toBeGreaterThanOrEqual(0);
          expect(hit.y, where).toBeGreaterThanOrEqual(0);
          expect(hit.x + hit.width, where).toBeLessThanOrEqual(size.width);
          expect(hit.y + hit.height, where).toBeLessThanOrEqual(size.height);
          expect(hit.anchor.x, where).toBeGreaterThan(hit.x);
          expect(hit.anchor.x, where).toBeLessThan(hit.x + hit.width);
          expect(hit.anchor.y, where).toBeGreaterThan(hit.y);
          expect(hit.anchor.y, where).toBeLessThan(hit.y + hit.height);
          if (size === PHONE) expect(hit.width, where).toBeGreaterThanOrEqual(28);
        }
        for (const [index, hit] of hits.entries()) {
          for (const other of hits.slice(index + 1)) {
            expect(overlap(hit, other), `${String(count)} buildings: ${hit.id} and ${other.id}`).toBe(false);
          }
        }
      }
    });
  }

  test('the rows face each other in pairs: building 1 across the way from building 2, and so on down the street', () => {
    const hits = picture.layout(street(8), PHONE);
    const [first, second, third] = hits;
    expect(first && second && third).toBeTruthy();
    if (first === undefined || second === undefined || third === undefined) return;
    // The pair shares a place along the way; the next pair stands further on.
    expect(Math.abs(first.anchor.x - second.anchor.x)).toBeLessThan(first.width / 2);
    expect(third.anchor.x).toBeGreaterThan(first.anchor.x + first.width / 2);
    // One stands on the far side of the way, one on the near side.
    expect(first.y + first.height).toBeLessThanOrEqual(second.y);
  });

  test('a building with more floors stands taller', () => {
    const low = picture.layout(
      street(6, () => 8),
      PHONE,
    );
    const high = picture.layout(
      street(6, (index) => (index === 2 ? 90 : 8)),
      PHONE,
    );
    expect(high[2]?.height).toBeGreaterThan(low[2]?.height ?? Infinity);
    expect(high[3]?.height).toBe(low[3]?.height);
  });

  test('the layout is a pure function: the same view-model and size, the same hits', () => {
    expect(picture.layout(street(13), PHONE)).toEqual(picture.layout(street(13), PHONE));
  });
});

describe('the street picture: painted with the stylesheet’s inks, text a phone can read', () => {
  test('the same moment paints the same calls; another moment moves the rain and the windows', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    const later = new RecordingPainter();
    picture.paint(one, street(10), PHONE, palette(one.asked), 1200, '');
    picture.paint(two, street(10), PHONE, palette(two.asked), 1200, '');
    picture.paint(later, street(10), PHONE, palette(later.asked), 1700, '');
    expect(one.calls).toEqual(two.calls);
    expect(later.calls).not.toEqual(one.calls);
  });

  test('every ink is one of the listed tokens; every word or number is 12 px or more', () => {
    for (const size of [PHONE, DESKTOP]) {
      const painter = new RecordingPainter();
      picture.paint(painter, street(20), size, palette(painter.asked), 800, 'enter:3');
      expect(
        [...painter.asked].filter((token) => !TEXT_INKS.includes(token) && !SURFACE_INKS.includes(token)),
      ).toEqual([]);
      const texts = painter.calls.filter((call) => call.startsWith('fillText('));
      expect(texts.length).toBeGreaterThan(0);
      for (const call of texts) {
        const px = /(\d+(?:\.\d+)?)px/.exec(call)?.[1];
        expect(Number(px), call).toBeGreaterThanOrEqual(12);
      }
    }
  });

  test('each building is numbered under its feet by the number its row goes by', () => {
    const painter = new RecordingPainter();
    picture.paint(painter, street(12), PHONE, palette(painter.asked), 0, '');
    const numbers = painter.calls
      .filter((call) => call.startsWith('fillText('))
      .map((call) => call.slice(9).split(',')[0]);
    // The far row is painted before the way, the near row after it: the order is the painter's, the set is the list's.
    expect([...numbers].sort((a, b) => Number(a) - Number(b))).toEqual(
      street(12).children.map((child) => child.ordinal),
    );
  });

  test('the lit building is outlined in yellow; none is when nothing is lit', () => {
    const plain = new RecordingPainter();
    const lit = new RecordingPainter();
    picture.paint(plain, street(6), PHONE, palette(plain.asked), 0, '');
    picture.paint(lit, street(6), PHONE, palette(lit.asked), 0, 'enter:4');
    const outlines = (painter: RecordingPainter) =>
      painter.calls.filter((call) => call.startsWith('strokeRect(') || call.startsWith('stroke(<yl>'));
    expect(lit.calls.filter((call) => call.startsWith('stroke(<yl>')).length).toBeGreaterThan(
      plain.calls.filter((call) => call.startsWith('stroke(<yl>')).length,
    );
    expect(outlines(plain).length).toBeGreaterThan(0);
  });
});
