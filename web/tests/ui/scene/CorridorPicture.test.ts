import { describe, expect, test } from 'vitest';
import type { CorridorShape } from '#engine/model/CorridorShape.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { CanvasFont } from '#ui/canvas/CanvasFont.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import { BonePanel } from '#ui/scene/BonePanel.ts';
import { ColdMark } from '#ui/scene/ColdMark.ts';
import { CorridorPicture } from '#ui/scene/CorridorPicture.ts';
import { CurvedHall } from '#ui/scene/CurvedHall.ts';
import { DoorLooks } from '#ui/scene/DoorLooks.ts';
import { EndingReach } from '#ui/scene/EndingReach.ts';
import { EndWall } from '#ui/scene/EndWall.ts';
import type { HallEnd } from '#ui/scene/HallEnd.ts';
import { FrostMark } from '#ui/scene/FrostMark.ts';
import { GlassPanel } from '#ui/scene/GlassPanel.ts';
import { LongHall } from '#ui/scene/LongHall.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';
import { MetalPanel } from '#ui/scene/MetalPanel.ts';
import { PlainMark } from '#ui/scene/PlainMark.ts';
import { PlainPanel } from '#ui/scene/PlainPanel.ts';
import { SceneHash } from '#ui/scene/SceneHash.ts';
import type { CorridorVM } from '#ui/scene/CorridorVM.ts';
import { ServiceHall } from '#ui/scene/ServiceHall.ts';
import { ShadowGlow } from '#ui/scene/ShadowGlow.ts';
import { StaticHall } from '#ui/scene/StaticHall.ts';
import { StaticMark } from '#ui/scene/StaticMark.ts';
import { StonePanel } from '#ui/scene/StonePanel.ts';
import { TimberPanel } from '#ui/scene/TimberPanel.ts';
import { doorLook } from '#tests/support/doorLook.ts';
import { RecordingHallEnd } from '#tests/support/RecordingHallEnd.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';
import { ShadowNotingPainter } from '#tests/support/ShadowNotingPainter.ts';
import { laid, shownTrack } from '#tests/support/laidTrack.ts';

/** The phone's picture at 360 × 640 (tasks/ui/U01b.md) and a taller phone's. */
const PHONE = { width: 328, height: 277 };
const TALL = { width: 380, height: 403 };
const SHAPES: readonly CorridorShape[] = ['long', 'service', 'curved', 'static'];
/** Door states by name and the look their list gives them, and material families, dealt round the doors. */
const STATES = [
  { state: 'Stable', stateLook: 'plain' },
  { state: 'Frozen', stateLook: 'frost' },
  { state: 'Cold', stateLook: 'cold' },
  { state: 'Static', stateLook: 'static' },
] as const;
const FAMILIES = ['metal', 'glass', 'stone', 'timber', 'bone', 'plain'] as const;

/** The door at this index: its state (by its place in `STATES`) and its family, dealt round. */
function look(index: number, state: number): ReturnType<typeof doorLook> {
  return doorLook({
    material: `Hatch ${String(index + 1)}`,
    ...(STATES[state % STATES.length] ?? STATES[0]),
    family: FAMILIES[index % FAMILIES.length] ?? 'plain',
  });
}

/** A corridor of `doors` doors in pairs, as the engine lists them; a door's word on every third. */
function corridor(
  doors: number,
  options: { shape?: CorridorShape; visited?: readonly number[]; states?: readonly number[] } = {},
): CorridorVM {
  return {
    label: 'Picture of a corridor',
    address: '0.0.0.0.0.0.0.0.2.3',
    children: Array.from({ length: doors }, (_, index) => ({
      id: `enter:${String(index)}`,
      ordinal: String(index + 1),
      name: `_word_ Hatch ${String(index + 1)} [STATE]`,
      landmark: false,
      visited: options.visited?.includes(index) ?? false,
      sealed: false,
      address: `0.0.0.0.0.0.0.0.2.3.${String(index)}`,
      door: {
        look: look(index, options.states?.[index] ?? index),
        words: index % 3 === 0 ? 'KEEP_WALKING' : '',
      },
    })),
    shape: options.shape ?? 'service',
    slider: 'Doors',
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

/** The corridor with the parts `main.ts` hands it; a test may hand the halls that end their own end. */
function picture(end: HallEnd = new EndWall()): CorridorPicture {
  const noise = new SceneHash();
  const glow = new ShadowGlow();
  const reach = new EndingReach();
  const long = new LongHall();
  return new CorridorPicture({
    font: new CanvasFont(),
    inks: new DoorLooks(),
    glow,
    halls: {
      long,
      service: new ServiceHall(end, reach),
      curved: new CurvedHall(end, reach),
      static: new StaticHall(noise, reach),
      none: long,
    },
    panels: {
      glass: new GlassPanel(),
      metal: new MetalPanel(),
      stone: new StonePanel(),
      timber: new TimberPanel(),
      bone: new BonePanel(),
      plain: new PlainPanel(),
    },
    marks: {
      frost: new FrostMark(noise),
      cold: new ColdMark(glow),
      static: new StaticMark(),
      plain: new PlainMark(),
    },
  });
}

describe('the corridor’s camera: how far along the hall you stand', () => {
  test('it rests at the entrance and runs to the last pair’s stop; the doors of a pair share a stop, 2.2 units a pair', () => {
    const camera = picture().camera(corridor(9), PHONE);
    expect([camera.rest(), camera.clamp(-5)]).toEqual([0, 0]);
    expect(camera.clamp(100)).toBeCloseTo(8.6, 10);
    expect([0, 1, 2, 3, 8].map((door) => camera.stopOf(`enter:${String(door)}`))).toEqual([
      0,
      0,
      expect.closeTo(2, 10),
      expect.closeTo(2, 10),
      expect.closeTo(8.6, 10),
    ]);
    expect(camera.stopCount()).toBe(5);
  });

  test('a swipe up walks on, a release coasts without settling on a door, and going in zooms', () => {
    const camera = picture().camera(corridor(9), PHONE);
    expect(camera.drags()).toBe(true);
    expect(camera.along({ x: 1, y: 2 })).toBe(2);
    expect(camera.dragRate()).toBeLessThan(0);
    expect(camera.landing(3.2, 1)).toBeCloseTo(3.5, 10);
    expect(camera.zooms()).toBe(true);
  });

  test('a longer walk takes longer, never past 1.5 s', () => {
    const camera = picture().camera(corridor(40), PHONE);
    expect(camera.pace(1)).toBeLessThan(camera.pace(10));
    expect(camera.pace(40)).toBe(1500);
  });

  test('the slider is a band along the foot a thumb can hold, inside the picture; its ends reach past the hall’s', () => {
    for (const size of [PHONE, TALL]) {
      const camera = picture().camera(corridor(9), size);
      const track = shownTrack(camera.track());
      expect(track.axis).toBe('x');
      expect(track.height).toBeGreaterThanOrEqual(44);
      expect(track.x).toBeGreaterThanOrEqual(0);
      expect(track.x + track.width).toBeLessThanOrEqual(size.width);
      expect(track.y + track.height).toBeLessThanOrEqual(size.height);
      expect(track.from).toBeLessThan(0);
      expect(track.to).toBeGreaterThan(8.6);
    }
    const empty = picture().camera(corridor(0), PHONE);
    expect([laid(empty.track()).shown, empty.drags(), empty.stopCount()]).toEqual([false, false, 0]);
  });
});

describe('the corridor’s doors: the ones in reach are what a finger finds', () => {
  test('at the entrance the near doors are the hits, nearest first, inside the picture, each anchored inside itself', () => {
    for (const size of [PHONE, TALL]) {
      const hits = picture().layout(corridor(20), size, 0);
      expect(
        hits
          .slice(0, 2)
          .map((hit) => hit.id)
          .sort(),
      ).toEqual(['enter:0', 'enter:1']);
      expect(hits.map((hit) => hit.id)).not.toContain('enter:19');
      for (const hit of hits) {
        expect(hit.anchor.x).toBeGreaterThanOrEqual(hit.x);
        expect(hit.anchor.x).toBeLessThanOrEqual(hit.x + hit.width);
        expect(hit.anchor.y).toBeGreaterThanOrEqual(hit.y);
        expect(hit.anchor.y).toBeLessThanOrEqual(hit.y + hit.height);
        expect(hit.x + hit.width).toBeGreaterThan(0);
        expect(hit.x).toBeLessThan(size.width);
      }
    }
  });

  test('walking on brings the far doors into reach and leaves the passed ones behind', () => {
    const vm = corridor(20);
    const camera = picture().camera(vm, PHONE);
    const ids = picture()
      .layout(vm, PHONE, camera.stopOf('enter:18') ?? 0)
      .map((hit) => hit.id);
    expect(ids).toContain('enter:19');
    expect(ids).not.toContain('enter:0');
  });

  test('each door stands on its own side: the first of a pair on the left, the second on the right', () => {
    const hits = picture().layout(corridor(2), PHONE, 0);
    const left = hits.find((hit) => hit.id === 'enter:0');
    const right = hits.find((hit) => hit.id === 'enter:1');
    expect(left?.anchor.x).toBeLessThan(PHONE.width / 2);
    expect(right?.anchor.x).toBeGreaterThan(PHONE.width / 2);
  });
});

describe('the corridor painted: the stylesheet’s inks, words a phone can read', () => {
  test('the same moment and view paint the same calls; another view walks the hall', () => {
    const paint = (view: number): string[] => {
      const painter = new RecordingPainter();
      picture().paint(
        painter,
        corridor(12),
        PHONE,
        palette(painter.asked),
        900,
        new MarkedChild('enter:3'),
        view,
        new NoChild(),
      );
      return painter.calls;
    };
    expect(paint(2)).toEqual(paint(2));
    expect(paint(4)).not.toEqual(paint(2));
  });

  test('every ink is listed; every word is 12 px or more, written whole (alpha 1) in a text ink, never under a shadow', () => {
    for (const shape of SHAPES) {
      for (const view of [0, 3.3, 8.8]) {
        for (const size of [PHONE, TALL]) {
          const painter = new ShadowNotingPainter();
          picture().paint(
            painter,
            corridor(9, { shape, visited: [2, 5] }),
            size,
            palette(painter.asked),
            700,
            new MarkedChild('enter:4'),
            view,
            new MarkedChild('enter:6'),
          );
          expect(
            [...painter.asked].filter((t) => !TEXT_INKS.includes(t) && !SURFACE_INKS.includes(t)),
          ).toEqual([]);
          const texts = painter.calls.filter((call) => call.startsWith('fillText('));
          expect(texts.length).toBeGreaterThan(0);
          for (const call of texts) {
            expect(Number(/(\d+(?:\.\d+)?)px/.exec(call)?.[1]), call).toBeGreaterThanOrEqual(12);
            expect(call.endsWith(',1.0)'), call).toBe(true);
            expect(TEXT_INKS, call).toContain(/<([a-z-]+)>/.exec(call)?.[1] ?? '');
          }
          expect(painter.shadows.every((blur) => blur === 0)).toBe(true);
        }
      }
    }
  });

  test('a door’s state tints it: frozen and cold doors in blue, a static one in magenta', () => {
    const inks = (state: number): Set<string> => {
      const painter = new RecordingPainter();
      picture().paint(
        painter,
        corridor(2, { states: [state, 0] }),
        PHONE,
        palette(painter.asked),
        0,
        new NoChild(),
        0,
        new NoChild(),
      );
      return painter.asked;
    };
    expect(inks(1).has('bl')).toBe(true);
    expect(inks(2).has('bl')).toBe(true);
    expect(inks(3).has('mg')).toBe(true);
    expect(inks(0).has('bl')).toBe(false);
  });

  test('the door you stand by and the lit one are named by their material; the rest go by their number', () => {
    const painter = new RecordingPainter();
    picture().paint(
      painter,
      corridor(6),
      PHONE,
      palette(painter.asked),
      0,
      new MarkedChild('enter:2'),
      0,
      new MarkedChild('enter:1'),
    );
    const words = painter.calls.filter((call) => call.startsWith('fillText('));
    expect(words.some((call) => call.includes('2 · Hatch 2,') && call.includes('<yl>'))).toBe(true);
    expect(words.some((call) => call.includes('3 · Hatch 3,') && call.includes('<wh>'))).toBe(true);
    expect(words.some((call) => call.startsWith('fillText(1,'))).toBe(true);
  });

  test('the hall’s end is drawn once it is in sight, and not while it is lost in the fog', () => {
    const drawn = (doors: number, view: number): number => {
      const end = new RecordingHallEnd();
      const painter = new RecordingPainter();
      picture(end).paint(
        painter,
        corridor(doors),
        PHONE,
        palette(painter.asked),
        0,
        new NoChild(),
        view,
        new NoChild(),
      );
      return end.drawn;
    };
    expect(drawn(4, 2)).toBe(1);
    expect(drawn(40, 0)).toBe(0);
  });

  test('entering from the elevator you stand by the first door', () => {
    const painter = new RecordingPainter();
    picture().paint(painter, corridor(6), PHONE, palette(painter.asked), 0, new NoChild(), 0, new NoChild());
    expect(painter.calls.some((call) => call.startsWith('fillText(1 · Hatch 1,'))).toBe(true);
  });
});
