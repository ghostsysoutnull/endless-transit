import { describe, expect, test } from 'vitest';
import { CorridorPortrait } from '#engine/model/CorridorPortrait.ts';
import { DoorLook } from '#engine/model/DoorLook.ts';
import { Level } from '#engine/model/Level.ts';
import { PlanPortrait } from '#engine/model/PlanPortrait.ts';
import { RoomLook } from '#engine/model/RoomLook.ts';
import { StreetPortrait } from '#engine/model/StreetPortrait.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Seed } from '#engine/rng/Seed.ts';
import type { Drawing } from '#ui/screens/Drawing.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { option, PLANET, STREET, towerSnapshot } from '#tests/support/hudSnapshots.ts';
import { corridorVM, planVM, readDrawing, streetVM, towerVM } from '#tests/support/readDrawing.ts';
import { placeOf } from '#tests/support/snapshotParts.ts';

/** What the snapshot's place draws: its listed places are the options the engine marks as travel. */
function drawingOf(snapshot: GameSnapshot): Drawing {
  const place = snapshot.place;
  if (place === null) throw new Error('a drawing needs a place');
  const by = (role: string) => snapshot.options.filter((each) => each.role === role);
  return new SceneDrawing().of(
    place,
    { travel: by('travel'), moves: by('move'), leave: by('return'), takes: by('take') },
    0,
  );
}

describe('the drawing (U01b): what the scene draws, as data', () => {
  const DRAWN: GameSnapshot = {
    ...STREET,
    place: {
      ...placeOf(STREET),
      portrait: new StreetPortrait([
        { address: '0.0.0.0.1.0.0.0.0', floors: 16, doors: 9 },
        { address: '0.0.0.0.1.0.0.0.1', floors: 60, doors: 4 },
      ]),
      noise: new Seed(0xa1b2c3d4, 0xe5f60718),
    },
    options: [
      option({
        id: 'enter:0',
        key: '1',
        label: 'Enter Building: Ornate Sanctum',
        place: 'Ornate Sanctum',
        ordinal: '1',
        address: '0.0.0.0.1.0.0.0.0',
        visited: true,
      }),
      option({
        id: 'enter:1',
        label: 'Enter Building: The Void-Watcher',
        place: 'The Void-Watcher',
        ordinal: '2',
        sealed: true,
        landmark: true,
        address: '0.0.0.0.1.0.0.0.1',
      }),
      option({ id: 'leave', key: 'l', label: 'Leave Street', role: 'return' }),
      option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
    ],
  };

  test('one child per listed place, in the list’s order, with its building’s figure, its address and its marks; the noise and the place’s address pass through', () => {
    const drawing = streetVM(drawingOf(DRAWN));
    expect(drawing.noise).toEqual(new Seed(0xa1b2c3d4, 0xe5f60718));
    expect(drawing.address).toBe('0.0.0.0.1.0.0.0');
    expect(drawing.children).toEqual([
      {
        id: 'enter:0',
        ordinal: '1',
        name: 'Ornate Sanctum',
        floors: 16,
        doors: 9,
        landmark: false,
        visited: true,
        sealed: false,
        address: '0.0.0.0.1.0.0.0.0',
      },
      {
        id: 'enter:1',
        ordinal: '2',
        name: 'The Void-Watcher',
        floors: 60,
        doors: 4,
        landmark: true,
        visited: false,
        sealed: true,
        address: '0.0.0.0.1.0.0.0.1',
      },
    ]);
    expect(drawing.label).not.toBe('');
  });

  test('a place no picture draws asks for none: its listed places are its children, with no part', () => {
    const plain = readDrawing(drawingOf(PLANET));
    expect(plain.drawn).toBe('unseen');
    expect(plain.vm.children.map((child) => child.name)).toEqual([
      'Southern Glacier Kingdom',
      'Free Dust Union',
    ]);
  });
});

describe('the building (U02): the tower drawn', () => {
  test('the tower passes through as data: its roof, car, a row per level with its level; each floor listed at its level; the slider is named by the list', () => {
    const drawing = towerVM(drawingOf(towerSnapshot(16, 5)));
    expect(drawing.tower).toEqual({
      address: '0.0.0.0.1.0.0.0.0',
      landmark: true,
      car: 5,
      breached: false,
      rows: Array.from({ length: 16 }, (_, number) => ({
        address: `0.0.0.0.1.0.0.0.0.${String(number)}`,
        level: new Level(number, 'floor'),
        shape: 'curved',
        looks: [
          new DoorLook({ material: 'Heavy Bulkhead', state: 'Frozen', family: 'metal', stateLook: 'frost' }),
          new DoorLook({ material: 'Pitted Concrete', state: 'Stable', family: 'stone', stateLook: 'plain' }),
        ],
      })),
    });
    expect(drawing.children.map((child) => child.level.number())).toEqual(
      Array.from({ length: 16 }, (_, n) => 15 - n),
    );
    expect(drawing.slider).toBe('Ride to a floor');
  });
});

describe('the corridor (U02): its doors drawn', () => {
  test('how it runs, and each listed door with its look and the word on it, found by its address', () => {
    const FROZEN = new DoorLook({
      material: 'Heavy Bulkhead',
      state: 'Frozen',
      family: 'metal',
      stateLook: 'frost',
    });
    const PLAIN = new DoorLook({
      material: 'Pitted Concrete',
      state: 'Stable',
      family: 'stone',
      stateLook: 'plain',
    });
    const drawing = corridorVM(
      drawingOf({
        ...STREET,
        place: {
          ...placeOf(STREET),
          childrenHeading: 'Doors',
          portrait: new CorridorPortrait({
            shape: 'curved',
            abyssal: false,
            doors: [
              { address: '0.9.1', look: PLAIN, words: '' },
              { address: '0.9.0', look: FROZEN, words: 'KEEP_WALKING' },
            ],
          }),
        },
        options: [
          option({ id: 'enter:0', label: 'Open a door', place: 'Frozen door', address: '0.9.0' }),
          option({ id: 'enter:1', label: 'Open a door', place: 'Plain door', address: '0.9.1' }),
        ],
      }),
    );
    expect(drawing.shape).toBe('curved');
    expect(drawing.children.map((child) => [child.id, child.door])).toEqual([
      ['enter:0', { look: FROZEN, words: 'KEEP_WALKING' }],
      ['enter:1', { look: PLAIN, words: '' }],
    ]);
    expect(drawing.slider).toBe('Doors');
  });
});

describe('the plan (U03): a room drawn as its apartment, the options it draws joined by what they do', () => {
  const ROOMS = ['0.0.0.0.1.0.0.0.0.2.0.4.0', '0.0.0.0.1.0.0.0.0.2.0.4.1'];
  const ROOM: GameSnapshot = {
    ...STREET,
    place: {
      ...placeOf(STREET),
      address: ROOMS[0] ?? '',
      portrait: new PlanPortrait({
        rooms: [
          { address: ROOMS[0] ?? '', name: 'Quiet Archive', sight: 'visited', relics: 1 },
          { address: ROOMS[1] ?? '', name: 'Salt Pantry', sight: 'known', relics: 0 },
        ],
        here: ROOMS[0] ?? '',
        look: new RoomLook({ walls: 'rust', light: 'analog', cold: true, furniture: 2, anomaly: false }),
      }),
    },
    options: [
      option({ id: 'capture:0', label: 'Take bone flute', place: 'bone flute', role: 'take', ordinal: '1' }),
      option({
        id: 'move:forward',
        label: 'Go forward',
        place: 'Salt Pantry',
        role: 'move',
        address: ROOMS[1] ?? '',
      }),
      option({ id: 'leave', key: 'l', label: 'Leave the apartment', role: 'return' }),
      option({ id: 'scan', key: 's', label: 'Scan', role: 'system' }),
    ],
  };

  test('the doorway is the move by the room it leads to, the way out is the leave, the relics are the takes; nothing else is drawn', () => {
    const drawing = planVM(drawingOf(ROOM));
    expect(drawing.doors.map((door) => [door.id, door.address])).toEqual([['move:forward', ROOMS[1]]]);
    expect(drawing.exits.map((exit) => exit.id)).toEqual(['leave']);
    expect(drawing.relics.map((relic) => [relic.id, relic.name])).toEqual([['capture:0', 'bone flute']]);
    expect(drawing.children.map((each) => each.id)).toEqual(['move:forward', 'leave', 'capture:0']);
    expect(drawing.here).toBe(ROOMS[0]);
    expect(drawing.rooms.map((room) => room.sight)).toEqual(['visited', 'known']);
  });
});
