import { describe, expect, test } from 'vitest';
import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { RoomSight } from '#engine/model/RoomSight.ts';
import { RoomLook } from '#engine/model/RoomLook.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import type { ChildMark } from '#ui/scene/ChildMark.ts';
import type { Framing } from '#ui/scene/Framing.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';
import type { PlanVM } from '#ui/scene/PlanVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';
import { NoMinimap } from '#ui/scene/NoMinimap.ts';
import { InRoom } from '#ui/scene/InRoom.ts';
import { OverPlan } from '#ui/scene/OverPlan.ts';

const PHONE = { width: 360, height: 277 };
const picture = new ScenePictures().plan();
/** How a room is framed standing in it and over the plan (U03d). */
const IN_ROOM = new InRoom();
const OVER_PLAN = new OverPlan();
/** One word each, so a test can tell which room a word was written in. */
const NAMES = ['Kitchen', 'Pantry', 'Vault', 'Chapel'];
const addressOf = (index: number): string => `0.0.0.0.0.0.0.0.0.0.0.3.${String(index)}`;

function child(id: string, facts: Partial<SceneChild> = {}): SceneChild {
  return { id, ordinal: '', name: id, landmark: false, visited: false, sealed: false, address: '', ...facts };
}

/** An apartment's plan as the presenter hands it: its rooms by sight, the one stood in, its doorways, the way out and the relics. */
function plan(facts: {
  sights: readonly RoomSight[];
  here: number;
  relics?: number;
  sealed?: boolean;
  /** The key of each room's light, in order; `analog` where none is given. */
  lights?: readonly string[];
  /** The keys the walls and the light of the room stood in came from. */
  look?: { walls: string; light: string };
}): PlanVM {
  const rooms: PlanRoom[] = facts.sights.map((sight, index) => ({
    address: addressOf(index),
    name: NAMES[index] ?? `Room ${String(index + 1)}`,
    sight,
    relics: sight === 'fog' ? 0 : 2,
    light: facts.lights?.[index] ?? 'analog',
  }));
  const doors = [
    ...(facts.here > 0 ? [child('move:back', { address: addressOf(facts.here - 1) })] : []),
    ...(facts.here < rooms.length - 1 ? [child('move:forward', { address: addressOf(facts.here + 1) })] : []),
  ];
  const exits = facts.here === 0 ? [child('leave')] : [];
  const relics = Array.from({ length: facts.relics ?? 0 }, (_, index) =>
    child(`capture:${String(index)}`, { ordinal: String(index + 1), sealed: facts.sealed === true }),
  );
  return {
    label: 'Picture of Quiet Archive',
    address: addressOf(facts.here),
    children: [...doors, ...exits, ...relics],
    slider: '',
    decay: 0,
    noise: new Seed(1, 2),
    rooms,
    here: addressOf(facts.here),
    look: new RoomLook({
      walls: facts.look?.walls ?? 'rust',
      light: facts.look?.light ?? 'analog',
      cold: false,
      furniture: 2,
      anomaly: false,
    }),
    doors,
    exits,
    relics,
    mapKey: { toPlan: { text: 'MAP', label: 'Apartment plan' }, toRoom: { text: 'ROOM', label: 'Back into the room' } },
  };
}

/** The words a framing of the plan writes, as the painter's calls. */
function wordsOf(vm: PlanVM, framing: Framing, lit: ChildMark = new NoChild()): readonly string[] {
  const painter = new RecordingPainter();
  picture.paint(painter, vm, PHONE, palette(painter.asked), 0, lit, framing, new NoMinimap());
  return painter.calls.filter((call) => call.startsWith('fillText('));
}

/** The inks the plan asks for, standing in the room. */
function inksOf(vm: PlanVM): readonly string[] {
  const painter = new RecordingPainter();
  const rest = picture.rest(vm, picture.camera(vm, PHONE), IN_ROOM);
  picture.paint(painter, vm, PHONE, palette(painter.asked), 0, new NoChild(), rest, new NoMinimap());
  return [...painter.asked];
}

function palette(record: Set<string>): (token: string) => string {
  return (token) => {
    record.add(token);
    return `<${token}>`;
  };
}

describe('the apartment’s plan (U03): what can be tapped', () => {
  test('at rest in the first room: each doorway, the way out and the relics are there to tap, a thumb wide, inside the picture', () => {
    const vm = plan({ sights: ['visited', 'known', 'fog'], here: 0, relics: 2 });
    const rest = picture.rest(vm, picture.camera(vm, PHONE), OVER_PLAN);
    const hits = picture.layout(vm, PHONE, rest);
    expect(hits.map((hit) => hit.id).sort()).toEqual(['capture:0', 'capture:1', 'leave', 'move:forward']);
    for (const hit of hits) {
      expect(hit.width, hit.id).toBeGreaterThanOrEqual(44);
      expect(hit.height, hit.id).toBeGreaterThanOrEqual(44);
      expect(hit.anchor.x, hit.id).toBeGreaterThanOrEqual(0);
      expect(hit.anchor.x, hit.id).toBeLessThanOrEqual(PHONE.width);
      expect(hit.anchor.y, hit.id).toBeGreaterThanOrEqual(0);
      expect(hit.anchor.y, hit.id).toBeLessThanOrEqual(PHONE.height);
    }
  });

  test('in a middle room: a doorway back and one on, no way out', () => {
    const vm = plan({ sights: ['visited', 'visited', 'known'], here: 1 });
    const hits = picture.layout(vm, PHONE, picture.rest(vm, picture.camera(vm, PHONE), OVER_PLAN));
    expect(hits.map((hit) => hit.id).sort()).toEqual(['move:back', 'move:forward']);
  });

  test('where the view goes before a pick: through a doorway into its room, back to the whole plan to leave, nowhere for a relic', () => {
    const vm = plan({ sights: ['visited', 'known', 'fog'], here: 0, relics: 1 });
    const camera = picture.camera(vm, PHONE);
    expect(picture.stopOf(vm, camera, 'move:forward', OVER_PLAN)?.equals(camera.room(1))).toBe(true);
    expect(picture.stopOf(vm, camera, 'leave', OVER_PLAN)?.equals(camera.whole())).toBe(true);
    expect(picture.stopOf(vm, camera, 'capture:0', OVER_PLAN)).toBeUndefined();
    expect(picture.rest(vm, camera, OVER_PLAN).equals(camera.room(0))).toBe(true);
  });

  test('standing in the room (U03d): it fills the picture; a doorway walks into the next room filling it, the way out pulls back to the whole plan, a relic goes nowhere', () => {
    const vm = plan({ sights: ['visited', 'known', 'fog'], here: 0, relics: 1 });
    const camera = picture.camera(vm, PHONE);
    expect(picture.rest(vm, camera, IN_ROOM).equals(camera.inside(0))).toBe(true);
    expect(picture.stopOf(vm, camera, 'move:forward', IN_ROOM)?.equals(camera.inside(1))).toBe(true);
    expect(picture.stopOf(vm, camera, 'leave', IN_ROOM)?.equals(camera.whole())).toBe(true);
    expect(picture.stopOf(vm, camera, 'capture:0', IN_ROOM)).toBeUndefined();
  });

  test('standing in a middle room (U03d): both doorways and every relic lie in the picture, to be tapped', () => {
    const vm = plan({ sights: ['visited', 'visited', 'known'], here: 1, relics: 3 });
    const hits = picture.layout(vm, PHONE, picture.rest(vm, picture.camera(vm, PHONE), IN_ROOM));
    expect(hits.map((hit) => hit.id).sort()).toEqual([
      'capture:0',
      'capture:1',
      'capture:2',
      'move:back',
      'move:forward',
    ]);
    for (const hit of hits) {
      expect(hit.anchor.x, hit.id).toBeGreaterThanOrEqual(0);
      expect(hit.anchor.x, hit.id).toBeLessThanOrEqual(PHONE.width);
      expect(hit.anchor.y, hit.id).toBeGreaterThanOrEqual(0);
      expect(hit.anchor.y, hit.id).toBeLessThanOrEqual(PHONE.height);
    }
  });
});

describe('the room’s card (U03e): its folded corner covers nothing to tap', () => {
  /** The corner: the bottom right triangle of the picture, this many CSS pixels a side (`app.css`, `.card .ear`). */
  const CORNER = 60;
  /** The card's picture at 360 × 640 and on the device (measured on the page). */
  const SIZES = [
    { width: 326, height: 462 },
    { width: 378, height: 661 },
  ];

  test('standing in any room of an apartment of 1 to 48, no doorway, way out or relic has its middle under the corner', () => {
    const under: string[] = [];
    for (const size of SIZES) {
      for (let count = 1; count <= 48; count++) {
        for (let here = 0; here < count; here++) {
          const vm = plan({
            sights: Array.from({ length: count }, () => 'visited' as const),
            here,
            relics: 4,
          });
          const hits = picture.layout(vm, size, picture.rest(vm, picture.camera(vm, size), IN_ROOM));
          for (const hit of hits) {
            const into = hit.anchor.x - (size.width - CORNER) + (hit.anchor.y - (size.height - CORNER));
            if (into > CORNER)
              under.push(`${String(size.width)}: room ${String(here + 1)} of ${String(count)}: ${hit.id}`);
          }
        }
      }
    }
    expect(under).toEqual([]);
  });
});

describe('the apartment’s plan (U03): how it is drawn', () => {
  test('every ink is the stylesheet’s; every word at 12 px or more, unfaded, in a text ink; the same calls twice', () => {
    const vm = plan({ sights: ['visited', 'visited', 'known', 'fog'], here: 1, relics: 3 });
    const camera = picture.camera(vm, PHONE);
    for (const framing of [camera.whole(), camera.room(1), camera.room(3), camera.inside(1)]) {
      const one = new RecordingPainter();
      const two = new RecordingPainter();
      picture.paint(
        one,
        vm,
        PHONE,
        palette(one.asked),
        700,
        new MarkedChild('capture:0'),
        framing,
        camera.minimap(framing),
      );
      picture.paint(
        two,
        vm,
        PHONE,
        palette(two.asked),
        700,
        new MarkedChild('capture:0'),
        framing,
        camera.minimap(framing),
      );
      expect(one.calls).toEqual(two.calls);
      expect([...one.asked].filter((ink) => !TEXT_INKS.includes(ink) && !SURFACE_INKS.includes(ink))).toEqual(
        [],
      );
      for (const call of one.calls.filter((each) => each.startsWith('fillText('))) {
        expect(Number(/(\d+(?:\.\d+)?)px/.exec(call)?.[1]), call).toBeGreaterThanOrEqual(12);
        expect(call.endsWith(',1.0)'), call).toBe(true);
        expect(TEXT_INKS, call).toContain(/<([a-z-]+)>/.exec(call)?.[1] ?? '');
      }
    }
  });

  test('the room you stand in, drawn in full: each relic labelled with two words of its name at most', () => {
    const base = plan({ sights: ['visited', 'visited', 'known', 'fog'], here: 1, relics: 2 });
    const relics = [
      child('capture:0', { ordinal: '1', name: 'Brass Astrolabe of Tides' }),
      child('capture:1', { ordinal: '2', name: 'Salt Lamp' }),
    ];
    const vm: PlanVM = { ...base, relics, children: [...base.doors, ...relics] };
    const words = wordsOf(
      vm,
      picture.rest(vm, picture.camera(vm, PHONE), OVER_PLAN),
      new MarkedChild('capture:0'),
    );
    expect(words.some((call) => call.startsWith('fillText(Brass Astrolabe,'))).toBe(true);
    expect(words.join('\n')).not.toContain('Tides');
  });

  test('the room you stand in carries no name in the picture (U03e); another room of the plan still does', () => {
    const vm = plan({ sights: ['visited', 'visited', 'known'], here: 1 });
    const camera = picture.camera(vm, PHONE);
    const inside = wordsOf(vm, picture.rest(vm, camera, IN_ROOM)).join('\n');
    const whole = wordsOf(vm, camera.whole()).join('\n');
    expect(inside).not.toContain('Pantry');
    expect(whole).not.toContain('Pantry');
    expect(whole).toContain('Kitchen');
  });

  test('a doorway into a room already entered is lit by that room’s light and carries its number; one into a room not entered carries none (U03e)', () => {
    const entered = plan({ sights: ['visited', 'visited'], here: 0, lights: ['analog', 'digital'] });
    const other = plan({ sights: ['visited', 'visited'], here: 0, lights: ['analog', 'future'] });
    const unknown = plan({ sights: ['visited', 'known'], here: 0, lights: ['analog', 'digital'] });
    const numbered = (vm: PlanVM): boolean =>
      wordsOf(vm, picture.rest(vm, picture.camera(vm, PHONE), IN_ROOM)).some(
        (call) => call.startsWith('fillText(2,') && call.includes('<text>'),
      );
    expect(inksOf(entered)).toContain('bl');
    expect(inksOf(other)).not.toContain('bl');
    expect(inksOf(other)).toContain('bc');
    expect(inksOf(unknown)).not.toContain('bl');
    expect(numbered(entered)).toBe(true);
    expect(numbered(unknown)).toBe(false);
  });

  test('the way out is drawn in its own ink (U03e)', () => {
    const look = { walls: 'void', light: 'atomic' };
    const lights = ['atomic', 'atomic'];
    expect(inksOf(plan({ sights: ['visited', 'visited'], here: 0, lights, look }))).toContain('ab');
    expect(inksOf(plan({ sights: ['visited', 'visited'], here: 1, lights, look }))).not.toContain('ab');
  });

  test('a room in fog shows neither its name nor its number; a known one shows them', () => {
    const vm = plan({ sights: ['visited', 'known', 'fog'], here: 0 });
    const painter = new RecordingPainter();
    picture.paint(
      painter,
      vm,
      PHONE,
      palette(painter.asked),
      0,
      new NoChild(),
      picture.camera(vm, PHONE).whole(),
      new NoMinimap(),
    );
    const words = painter.calls.filter((call) => call.startsWith('fillText(')).join('\n');
    expect(words).toContain('Pantry');
    expect(words).not.toContain('Vault');
    expect(words).not.toMatch(/fillText\(3,/);
  });
});
