import { describe, expect, test } from 'vitest';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import { TowerPicture } from '#ui/scene/TowerPicture.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

/** The phone's picture at 360 × 640 (tasks/ui/U01b.md) and a taller phone's. */
const PHONE = { width: 328, height: 277 };
const TALL = { width: 380, height: 403 };
const STATES = ['Stable', 'Frozen', 'Cold', 'Static', 'Humming'];
const SHAPES = ['long', 'service', 'curved', 'static'];

/** A tower of `floors` floors, `doors` a floor; listed top first as the engine lists them (Layers after the lobby); none listed at the elevator. */
function tower(floors: number, options: { car?: number; below?: number; listed?: boolean } = {}): SceneVM {
  const below = options.below ?? 0;
  const ordinals = [
    ...Array.from({ length: floors }, (_, n) => floors - 1 - n),
    ...Array.from({ length: below }, (_, k) => -1 - k),
  ];
  return {
    key: 'building',
    label: 'Picture of a tower',
    address: '0.0.0.0.0.0.0.0.2',
    children:
      options.listed === false
        ? []
        : ordinals.map((ordinal, index) => ({
            id: `enter:${String(index)}`,
            ordinal: String(ordinal),
            name: `Floor ${String(ordinal)}`,
            floors: 0,
            doors: 0,
            landmark: false,
            visited: ordinal % 7 === 0,
            sealed: false,
            address: `0.0.0.0.0.0.0.0.2.${String(index)}`,
            door: null,
          })),
    tower: {
      floors,
      doors: 6,
      address: '0.0.0.0.0.0.0.0.2',
      landmark: false,
      car: options.car ?? 0,
      below,
      rows: Array.from({ length: floors }, (_, n) => ({
        shape: SHAPES[n % 4] ?? 'long',
        looks: Array.from({ length: 6 }, (_, k) => ({
          material: 'Heavy Bulkhead',
          state: STATES[(n + k) % 5] ?? 'Stable',
        })),
      })),
    },
    shape: '',
    slider: 'Ride to a floor',
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

const picture = new TowerPicture();

describe('the tower’s camera: the car’s floor is the view', () => {
  test('it rests at the car, runs from the lowest level open to the top floor, stops at every listed floor by its number, and settles on a floor', () => {
    const camera = picture.camera(tower(100, { car: 37 }), PHONE);
    expect(camera).toMatchObject({ rest: 37, min: 0, max: 99, axis: 'y', snap: true, zoom: false });
    expect(camera?.stops.map((stop) => stop.at)).toEqual(Array.from({ length: 100 }, (_, n) => n));
    expect(camera?.stops[0]?.id).toBe('enter:99');
    expect(picture.camera(tower(12, { below: 10 }), PHONE)?.min).toBe(-10);
  });

  test('the gauge is a slider a thumb can hold, inside the picture, the top floor at its top; the elevator’s own screen has none and does not drag', () => {
    for (const size of [PHONE, TALL]) {
      const track = picture.camera(tower(100), size)?.track;
      expect(track?.width).toBeGreaterThanOrEqual(44);
      expect(track?.x).toBeGreaterThanOrEqual(0);
      expect((track?.x ?? 0) + (track?.width ?? 0)).toBeLessThanOrEqual(size.width);
      expect((track?.y ?? 0) + (track?.height ?? 0)).toBeLessThanOrEqual(size.height);
      expect(track).toMatchObject({ axis: 'y', from: 99, to: 0 });
    }
    const still = picture.camera(tower(100, { car: 40, listed: false }), PHONE);
    expect(still?.track).toBeNull();
    expect(still?.drag).toBe(0);
    expect(picture.camera({ ...tower(5), tower: null }, PHONE)).toBeNull();
  });

  test('the elevator speeds up, cruises and brakes: a long ride takes longer, never past 2.4 s', () => {
    const pace = picture.camera(tower(100), PHONE)?.pace ?? { base: 0, per: 0, most: 0 };
    const time = (d: number): number => Math.min(pace.most, pace.base + pace.per * Math.sqrt(d));
    expect(time(1)).toBeLessThan(time(10));
    expect(time(99)).toBeLessThanOrEqual(2400);
  });
});

describe('the tower’s window: thumb-sized floors that follow the car', () => {
  test('at every view of a hundred floors: the floors in the window are the hits, each a thumb tall, inside the picture, the car’s floor among them', () => {
    for (const size of [PHONE, TALL]) {
      for (const view of [0, 1, 37, 98, 99]) {
        const vm = tower(100);
        const hits = picture.layout(vm, size, view);
        expect(hits.length).toBeGreaterThanOrEqual(4);
        const floors = hits.map((hit) => Number(vm.children.find((child) => child.id === hit.id)?.ordinal));
        expect(floors).toContain(view);
        for (const hit of hits) {
          expect(hit.x).toBeGreaterThanOrEqual(0);
          expect(hit.y).toBeGreaterThanOrEqual(0);
          expect(hit.x + hit.width).toBeLessThanOrEqual(size.width);
          expect(hit.y + hit.height).toBeLessThanOrEqual(size.height);
          expect(hit.anchor.y).toBeGreaterThan(hit.y);
          expect(hit.anchor.y).toBeLessThan(hit.y + hit.height);
        }
        const whole = hits.filter((hit) => hit.height > 40);
        expect(
          whole.every((hit) => hit.height >= 44),
          `${String(view)} at ${String(size.height)}`,
        ).toBe(true);
      }
    }
  });

  test('a small tower shows all its floors; the elevator’s own screen has no hits; the Layers are hits below the lobby once open', () => {
    expect(picture.layout(tower(3), PHONE, 0)).toHaveLength(3);
    expect(picture.layout(tower(50, { listed: false }), PHONE, 20)).toEqual([]);
    const open = tower(12, { below: 10 });
    const deep = picture
      .layout(open, PHONE, -8)
      .map((hit) => open.children.find((c) => c.id === hit.id)?.ordinal);
    expect(deep).toContain('-8');
  });
});

describe('the tower painted: the stylesheet’s inks, numbers a phone can read', () => {
  test('the same moment and view paint the same calls; another view moves the window', () => {
    const one = new RecordingPainter();
    const two = new RecordingPainter();
    const moved = new RecordingPainter();
    picture.paint(one, tower(40), PHONE, palette(one.asked), 900, 'enter:3', 12);
    picture.paint(two, tower(40), PHONE, palette(two.asked), 900, 'enter:3', 12);
    picture.paint(moved, tower(40), PHONE, palette(moved.asked), 900, 'enter:3', 20);
    expect(one.calls).toEqual(two.calls);
    expect(moved.calls).not.toEqual(one.calls);
  });

  test('every ink is listed; every number is 12 px or more, written whole (alpha 1) in a text ink', () => {
    for (const [vm, view] of [
      [tower(100), 50],
      [tower(100), 0],
      [tower(100), 99],
      [tower(12, { below: 10 }), -5],
      [tower(30, { listed: false }), 10],
    ] as const) {
      const painter = new RecordingPainter();
      picture.paint(painter, vm, PHONE, palette(painter.asked), 700, 'enter:1', view);
      expect([...painter.asked].filter((t) => !TEXT_INKS.includes(t) && !SURFACE_INKS.includes(t))).toEqual(
        [],
      );
      const texts = painter.calls.filter((call) => call.startsWith('fillText('));
      expect(texts.length).toBeGreaterThan(0);
      for (const call of texts) {
        expect(Number(/(\d+(?:\.\d+)?)px/.exec(call)?.[1]), call).toBeGreaterThanOrEqual(12);
        expect(call.endsWith(',1.0)'), call).toBe(true);
        const ink = /<([a-z-]+)>/.exec(call)?.[1] ?? '';
        expect(TEXT_INKS, call).toContain(ink);
      }
    }
  });

  test('the bedrock shows in red only at the foot; a door’s state tints its tick', () => {
    const foot = new RecordingPainter();
    picture.paint(foot, tower(100), PHONE, palette(foot.asked), 0, '', 0);
    expect(foot.asked.has('rd')).toBe(true);
    const middle = new RecordingPainter();
    picture.paint(middle, tower(100), PHONE, palette(middle.asked), 0, '', 50);
    expect(middle.asked.has('rd')).toBe(false);
    expect(middle.asked.has('bl')).toBe(true);
  });
});
