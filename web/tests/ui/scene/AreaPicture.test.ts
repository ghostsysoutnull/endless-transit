import { describe, expect, test } from 'vitest';
import type { AreaLook } from '#engine/model/AreaLook.ts';
import type { MarkLook } from '#engine/model/MarkLook.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import type { AreaVM } from '#ui/scene/AreaVM.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';
import type { SceneHit } from '#ui/scene/SceneHit.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

/** The phone's picture at 360 × 640 (U01b, the rail grown to a thumb in U04), and a taller phone's. */
const PHONE = { width: 328, height: 259 };
const TALL = { width: 380, height: 420 };

/** Each level, the mark its children carry, and the most children the game deals it (the factories). */
const LEVELS: readonly { readonly look: AreaLook; readonly mark: MarkLook; readonly most: number }[] = [
  { look: 'universe', mark: 'filament', most: 7 },
  { look: 'filament', mark: 'sector', most: 8 },
  { look: 'sector', mark: 'solar-system', most: 7 },
  { look: 'null-reach', mark: 'solar-system', most: 2 },
  { look: 'solar-system', mark: 'planet', most: 10 },
  { look: 'planet', mark: 'country', most: 8 },
  { look: 'country', mark: 'city', most: 10 },
  { look: 'city', mark: 'street', most: 15 },
];

function area(look: AreaLook, mark: MarkLook, count: number): AreaVM {
  return {
    label: 'Picture of a level',
    address: '0.1.2',
    look,
    signal: 40,
    children: Array.from({ length: count }, (_, index) => ({
      id: `enter:${String(index)}`,
      ordinal: String(index + 1),
      name: `Place ${String(index + 1)}`,
      mark,
      landmark: index === 1,
      visited: index === 0,
      sealed: false,
      address: `0.1.2.${String(index)}`,
    })),
    slider: '',
    decay: 0,
    noise: new Seed(0x7f3a91c2, 0x0b4de6a8),
  };
}

function overlap(a: SceneHit, b: SceneHit): boolean {
  return a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
}

function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

const picture = new ScenePictures().area();

describe('an area above the street (U04): its places as marks a thumb can tap', () => {
  for (const size of [PHONE, TALL]) {
    for (const { look, mark, most } of LEVELS) {
      test(`${look}, 1 to ${String(most)} places at ${String(size.width)} × ${String(size.height)}: one hit each, a thumb wide, inside the picture, none overlapping`, () => {
        for (let count = 1; count <= most; count++) {
          const vm = area(look, mark, count);
          const hits = picture.layout(vm, size);
          expect(hits.map((hit) => hit.id)).toEqual(vm.children.map((child) => child.id));
          for (const hit of hits) {
            const where = `${String(count)} places, ${hit.id}`;
            expect(hit.width, where).toBeGreaterThanOrEqual(44);
            expect(hit.height, where).toBeGreaterThanOrEqual(44);
            expect(hit.x, where).toBeGreaterThanOrEqual(0);
            expect(hit.y, where).toBeGreaterThanOrEqual(0);
            expect(hit.x + hit.width, where).toBeLessThanOrEqual(size.width);
            expect(hit.y + hit.height, where).toBeLessThanOrEqual(size.height);
          }
          for (const [index, hit] of hits.entries()) {
            for (const other of hits.slice(index + 1)) {
              expect(overlap(hit, other), `${look}, ${String(count)} places: ${hit.id} and ${other.id}`).toBe(
                false,
              );
            }
          }
        }
      });
    }
  }

  test('painted the same way twice; every name at 12 px or more, in a text ink; every ink one the pictures may use', () => {
    for (const { look, mark, most } of LEVELS) {
      const one = new RecordingPainter();
      const two = new RecordingPainter();
      const vm = area(look, mark, most);
      picture.paint(one, vm, PHONE, palette(one.asked), 1200, new MarkedChild('enter:0'), 0, new NoChild());
      picture.paint(two, vm, PHONE, palette(two.asked), 1200, new MarkedChild('enter:0'), 0, new NoChild());
      expect(one.calls, look).toEqual(two.calls);
      const written = one.calls.filter((call) => call.startsWith('fillText('));
      // Every child's name is begun — each is `Place n` here — whether it then runs on, breaks or is cut short.
      const begun = written.filter((call) => call.startsWith('fillText(Place'));
      expect(begun.length, look).toBe(most);
      for (const call of written) {
        const px = /(\d+(?:\.\d+)?)px/.exec(call)?.[1];
        expect(Number(px), call).toBeGreaterThanOrEqual(12);
        expect(TEXT_INKS.includes(/<([\w-]+)>/.exec(call)?.[1] ?? ''), call).toBe(true);
      }
      expect(
        [...one.asked].filter((token) => !TEXT_INKS.includes(token) && !SURFACE_INKS.includes(token)),
        look,
      ).toEqual([]);
    }
  });
});
