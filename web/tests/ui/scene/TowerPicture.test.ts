import { describe, expect, test } from 'vitest';
import { Level } from '#engine/model/Level.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import type { TowerVM } from '#ui/scene/TowerVM.ts';
import { Roof, type RoofKind } from '#ui/scene/Roof.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { doorLook } from '#tests/support/doorLook.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

/** The phone's picture at 360 × 640 (tasks/ui/U01b.md) and a taller phone's. */
const PHONE = { width: 328, height: 277 };
const TALL = { width: 380, height: 403 };
/** Door states by name and the look their list gives them. */
const STATES = [
  { state: 'Stable', stateLook: 'plain' },
  { state: 'Frozen', stateLook: 'frost' },
  { state: 'Cold', stateLook: 'cold' },
  { state: 'Static', stateLook: 'static' },
  { state: 'Humming', stateLook: 'plain' },
] as const;
const SHAPES = ['long', 'service', 'curved', 'static'] as const;

/** A tower of `floors` floors, `doors` a floor, `below` Layers open; listed top first as the engine lists them (Layers after the lobby); none listed at the elevator. */
function tower(
  floors: number,
  options: { car?: number; below?: number; listed?: boolean; address?: string; landmark?: boolean } = {},
): TowerVM {
  const below = options.below ?? 0;
  const ordinals = [
    ...Array.from({ length: floors }, (_, n) => floors - 1 - n),
    ...Array.from({ length: below }, (_, k) => -1 - k),
  ];
  return {
    label: 'Picture of a tower',
    address: '0.0.0.0.0.0.0.0.2',
    children:
      options.listed === false
        ? []
        : ordinals.map((ordinal, index) => ({
            id: `enter:${String(index)}`,
            ordinal: String(ordinal),
            name: `Floor ${String(ordinal)}`,
            landmark: false,
            visited: ordinal % 7 === 0,
            sealed: false,
            address: `0.0.0.0.0.0.0.0.2.${String(index)}`,
            level: new Level(ordinal, ordinal < 0 ? 'layer' : 'floor'),
          })),
    tower: {
      address: options.address ?? '0.0.0.0.0.0.0.0.2',
      landmark: options.landmark ?? false,
      car: options.car ?? 0,
      rows: [
        ...Array.from({ length: below }, (_, k) => ({
          address: `0.0.0.0.0.0.0.0.2.${String(floors + below - 1 - k)}`,
          level: new Level(k - below, 'layer'),
          shape: 'none' as const,
          looks: [],
        })),
        ...Array.from({ length: floors }, (_, n) => ({
          address: `0.0.0.0.0.0.0.0.2.${String(n)}`,
          level: new Level(n, 'floor'),
          shape: SHAPES[n % 4] ?? 'long',
          looks: Array.from({ length: 6 }, (_, k) => doorLook(STATES[(n + k) % 5])),
        })),
      ],
    },
    slider: 'Ride to a floor',
    decay: 0,
    noise: new Seed(0x7f3a91c2, 0x0b4de6a8),
  };
}

function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

const picture = new ScenePictures().tower();

describe('the tower’s camera: the car’s floor is the view', () => {
  test('it rests at the car, runs from the lowest level open to the top floor, stops at every listed floor by its number, and settles on a floor', () => {
    const camera = picture.camera(tower(100, { car: 37 }), PHONE);
    expect([camera.rest(), camera.clamp(-5), camera.clamp(200)]).toEqual([37, 0, 99]);
    expect([camera.along({ x: 1, y: 2 }), camera.zooms(), camera.landing(3.4, 0)]).toEqual([2, false, 3]);
    expect(Array.from({ length: 100 }, (_, n) => camera.stopOf(`enter:${String(99 - n)}`))).toEqual(
      Array.from({ length: 100 }, (_, n) => n),
    );
    expect(picture.camera(tower(12, { below: 10 }), PHONE).clamp(-100)).toBe(-10);
  });

  test('the gauge is a slider a thumb can hold, inside the picture, the top floor at its top; the elevator’s own screen has none and does not drag', () => {
    for (const size of [PHONE, TALL]) {
      const track = picture.camera(tower(100), size).track();
      expect(track?.width).toBeGreaterThanOrEqual(44);
      expect(track?.x).toBeGreaterThanOrEqual(0);
      expect((track?.x ?? 0) + (track?.width ?? 0)).toBeLessThanOrEqual(size.width);
      expect((track?.y ?? 0) + (track?.height ?? 0)).toBeLessThanOrEqual(size.height);
      expect(track).toMatchObject({ axis: 'y', from: 99, to: 0 });
    }
    const elevator = picture.camera(tower(100, { car: 40, listed: false }), PHONE);
    expect([elevator.track(), elevator.drags()]).toEqual([null, false]);
    const nothing = picture.camera({ ...tower(5), tower: { ...tower(5).tower, rows: [] } }, PHONE);
    expect([nothing.track(), nothing.drags(), nothing.stopCount()]).toEqual([null, false, 0]);
  });

  test('the elevator speeds up, cruises and brakes: a long ride takes longer, never past 2.4 s', () => {
    const camera = picture.camera(tower(100), PHONE);
    expect(camera.pace(1)).toBeLessThan(camera.pace(10));
    expect(camera.pace(99)).toBeLessThanOrEqual(2400);
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

/** A digest of every call a painter was told, and how many: a picture's whole output in two values. */
function digest(painter: RecordingPainter): readonly [string, number] {
  let hash = 0x811c9dc5;
  const text = painter.calls.join('\n');
  for (let at = 0; at < text.length; at++) {
    hash ^= text.charCodeAt(at);
    hash = Math.imul(hash, 0x01000193);
  }
  return [(hash >>> 0).toString(16), painter.calls.length];
}

/** The first tower address on the street whose roof is `kind` (a landmark's is always the peak). */
function addressWith(kind: RoofKind): string {
  const roofs = new Roof(new SceneHash());
  for (let n = 0; ; n++) {
    const address = `0.0.0.0.0.0.0.0.${String(n)}`;
    if (roofs.of(address, false) === kind) return address;
  }
}

/**
 * Scaffolding (testing principle 7): the tower's calls pinned before its roofs and corridor rows move behind drawers
 * found by key (U02 fixes, step 2a) — removed, with the street's digest, at U02's close-out.
 */
describe('the tower paints the same calls as before its drawers move (a digest of them)', () => {
  const top = (address: string, landmark: boolean): TowerVM => tower(5, { car: 4, address, landmark });

  test('each roof, the top in view', () => {
    const digests = [
      top('0.0.0.0.0.0.0.0.2', true),
      top(addressWith('mast'), false),
      top(addressWith('box'), false),
      top(addressWith('flat'), false),
    ].map((vm) => {
      const painter = new RecordingPainter();
      picture.paint(painter, vm, PHONE, (token) => `<${token}>`, 1234, '', 4);
      return digest(painter);
    });
    expect(digests).toEqual([
      ['9576b233', 207],
      ['40ceb987', 202],
      ['a2fb1b96', 208],
      ['9465138f', 206],
    ]);
  });

  test('a breached tower, the Layers’ rows in view', () => {
    const painter = new RecordingPainter();
    picture.paint(painter, tower(12, { below: 10 }), PHONE, (token) => `<${token}>`, 1234, 'enter:14', -3);
    expect(digest(painter)).toEqual(['312684dc', 214]);
  });
});
