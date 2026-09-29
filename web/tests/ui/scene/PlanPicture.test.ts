import { describe, expect, test } from 'vitest';
import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { RoomSight } from '#engine/model/RoomSight.ts';
import { RoomLook } from '#engine/model/RoomLook.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { SURFACE_INKS, TEXT_INKS } from '#ui/canvas/Inks.ts';
import { MarkedChild } from '#ui/scene/MarkedChild.ts';
import { NoChild } from '#ui/scene/NoChild.ts';
import type { PlanVM } from '#ui/scene/PlanVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import { ScenePictures } from '#ui/scene/ScenePictures.ts';
import { RecordingPainter } from '#tests/support/RecordingPainter.ts';

const PHONE = { width: 360, height: 277 };
const picture = new ScenePictures().plan();
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
}): PlanVM {
  const rooms: PlanRoom[] = facts.sights.map((sight, index) => ({
    address: addressOf(index),
    name: NAMES[index] ?? `Room ${String(index + 1)}`,
    sight,
    relics: sight === 'fog' ? 0 : 2,
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
    look: new RoomLook({ walls: 'rust', light: 'analog', cold: false, furniture: 2, anomaly: false }),
    doors,
    exits,
    relics,
  };
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
    const rest = picture.rest(vm, picture.camera(vm, PHONE));
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
    const hits = picture.layout(vm, PHONE, picture.rest(vm, picture.camera(vm, PHONE)));
    expect(hits.map((hit) => hit.id).sort()).toEqual(['move:back', 'move:forward']);
  });

  test('where the view goes before a pick: through a doorway into its room, back to the whole plan to leave, nowhere for a relic', () => {
    const vm = plan({ sights: ['visited', 'known', 'fog'], here: 0, relics: 1 });
    const camera = picture.camera(vm, PHONE);
    expect(picture.stopOf(vm, camera, 'move:forward')?.equals(camera.room(1))).toBe(true);
    expect(picture.stopOf(vm, camera, 'leave')?.equals(camera.whole())).toBe(true);
    expect(picture.stopOf(vm, camera, 'capture:0')).toBeUndefined();
    expect(picture.rest(vm, camera).equals(camera.room(0))).toBe(true);
  });
});

describe('the apartment’s plan (U03): how it is drawn', () => {
  test('every ink is the stylesheet’s; every word at 12 px or more, unfaded, in a text ink; the same calls twice', () => {
    const vm = plan({ sights: ['visited', 'visited', 'known', 'fog'], here: 1, relics: 3 });
    const camera = picture.camera(vm, PHONE);
    for (const framing of [camera.whole(), camera.room(1), camera.room(3)]) {
      const one = new RecordingPainter();
      const two = new RecordingPainter();
      picture.paint(one, vm, PHONE, palette(one.asked), 700, new MarkedChild('capture:0'), framing);
      picture.paint(two, vm, PHONE, palette(two.asked), 700, new MarkedChild('capture:0'), framing);
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

  test('the room you stand in, drawn in full: its name above its relics, each relic labelled with two words of its name at most', () => {
    const base = plan({ sights: ['visited', 'visited', 'known', 'fog'], here: 1, relics: 2 });
    const relics = [
      child('capture:0', { ordinal: '1', name: 'Brass Astrolabe of Tides' }),
      child('capture:1', { ordinal: '2', name: 'Salt Lamp' }),
    ];
    const vm: PlanVM = { ...base, relics, children: [...base.doors, ...relics] };
    const rest = picture.rest(vm, picture.camera(vm, PHONE));
    const painter = new RecordingPainter();
    picture.paint(painter, vm, PHONE, palette(painter.asked), 0, new MarkedChild('capture:0'), rest);
    const words = painter.calls.filter((call) => call.startsWith('fillText('));
    const name = words.find((call) => call.startsWith('fillText(Pantry,'));
    const nameY = Number(name?.split(',')[2]);
    const tops = picture
      .layout(vm, PHONE, rest)
      .filter((hit) => hit.id.startsWith('capture:'))
      .map((hit) => hit.y);
    expect(tops).toHaveLength(2);
    for (const top of tops) expect(nameY).toBeLessThan(top);
    expect(words.some((call) => call.startsWith('fillText(Brass Astrolabe,'))).toBe(true);
    expect(words.join('\n')).not.toContain('Tides');
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
    );
    const words = painter.calls.filter((call) => call.startsWith('fillText(')).join('\n');
    expect(words).toContain('Pantry');
    expect(words).not.toContain('Vault');
    expect(words).not.toMatch(/fillText\(3,/);
  });
});
