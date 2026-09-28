import { describe, expect, test } from 'vitest';
import { DoorLook } from '#engine/model/DoorLook.ts';
import { Level } from '#engine/model/Level.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { Seed } from '#engine/rng/Seed.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import { SceneDrawing } from '#ui/screens/SceneDrawing.ts';
import { option, PLANET, STREET, towerSnapshot } from '#tests/support/hudSnapshots.ts';

/** What the snapshot's place draws: its listed places are the options the engine marks as travel. */
function drawingOf(snapshot: GameSnapshot): SceneVM {
  const place = snapshot.place;
  if (place === null) throw new Error('a drawing needs a place');
  return new SceneDrawing().of(
    place,
    snapshot.options.filter((each) => each.role === 'travel'),
    0,
  );
}

describe('the drawing (U01b): what the scene draws, as data', () => {
  const DRAWN: GameSnapshot = {
    ...STREET,
    place: { ...(STREET.place ?? ({} as never)), drawing: 'street', noise: new Seed(0xa1b2c3d4, 0xe5f60718) },
    options: [
      option({
        id: 'enter:0',
        key: '1',
        label: 'Enter Building: Ornate Sanctum',
        place: 'Ornate Sanctum',
        ordinal: '1',
        address: '0.0.0.0.1.0.0.0.0',
        figure: { floors: 16, doors: 9 },
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
        figure: { floors: 60, doors: 4 },
      }),
      option({ id: 'leave', key: 'l', label: 'Leave Street', role: 'return' }),
      option({ id: 'to-title', key: 't', label: 'Title screen', role: 'system' }),
    ],
  };

  test('one child per listed place, in the list’s order, with its figure, its address and its marks; the key, the noise and the place’s address pass through', () => {
    const drawing = drawingOf(DRAWN);
    expect(drawing.key).toBe('street');
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
        level: null,
        door: null,
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
        level: null,
        door: null,
      },
    ]);
    expect(drawing.label).not.toBe('');
  });

  test('a child with no figure is drawn with none: no floors, no doors', () => {
    const plain = drawingOf(PLANET);
    expect(plain.key).toBe('planet');
    expect(plain.children.map((child) => [child.floors, child.doors])).toEqual([
      [0, 0],
      [0, 0],
    ]);
  });
});

describe('the building (U02): the tower drawn', () => {
  test('the tower passes through as data: its size, roof, car, a row per level with its level; the slider is named by the list', () => {
    const drawing = drawingOf(towerSnapshot(16, 5));
    expect(drawing.key).toBe('building');
    expect(drawing.tower).toEqual({
      floors: 16,
      doors: 2,
      address: '0.0.0.0.1.0.0.0.0',
      landmark: true,
      car: 5,
      rows: Array.from({ length: 16 }, (_, number) => ({
        level: new Level(number, 'floor'),
        shape: 'curved',
        looks: [
          new DoorLook({ material: 'Heavy Bulkhead', state: 'Frozen', family: 'metal', stateLook: 'frost' }),
          new DoorLook({ material: 'Pitted Concrete', state: 'Stable', family: 'stone', stateLook: 'plain' }),
        ],
      })),
    });
    expect(drawing.slider).toBe('Ride to a floor');
    expect(drawing.shape).toBe('none');
    expect(drawingOf(STREET).tower).toBeNull();
  });
});
