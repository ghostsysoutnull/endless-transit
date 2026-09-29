import { describe, expect, test } from 'vitest';
import type { Portrait } from '#engine/model/Portrait.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import { FloorPad } from '#ui/screens/FloorPad.ts';
import { FloorsByTen } from '#ui/screens/FloorsByTen.ts';
import type { HudVM } from '#ui/screens/HudVM.ts';
import { LayersTogether } from '#ui/screens/LayersTogether.ts';
import type { TravelRowVM } from '#ui/screens/TravelRowVM.ts';
import { STREET, towerSnapshot } from '#tests/support/hudSnapshots.ts';
import { shown } from '#tests/support/shownPanel.ts';

const pads = new FloorPad({ floor: new FloorsByTen(), layer: new LayersTogether() });

/** A row of the list as the pad reads it: its id and its words; nothing marked unless the test says so. */
function row(facts: Partial<TravelRowVM> & { id: string }): TravelRowVM {
  return {
    key: '',
    ordinal: '',
    label: '',
    sealed: false,
    landmark: false,
    readings: [],
    mark: null,
    seen: null,
    ...facts,
  };
}

/** The portrait of a snapshot's place: what the pad finds each level on. */
function portraitOf(snapshot: GameSnapshot): Portrait {
  const place = snapshot.place;
  if (place === null) throw new Error('a pad needs a place');
  return place.portrait;
}

/** The pad of a snapshot's list: its travel options, each with a row of its own id. */
function padOf(snapshot: GameSnapshot): HudVM['pad'] {
  const travel = snapshot.options.filter((each) => each.role === 'travel');
  return pads.of(
    portraitOf(snapshot),
    travel,
    travel.map((each) => row({ id: each.id })),
  );
}

describe('the floors as a pad (U02, Decision 7)', () => {
  test('up to twenty floors: one group, ascending, each key its number and its row’s words for a reader', () => {
    const tower = towerSnapshot(16, 5);
    const travel = tower.options.filter((each) => each.role === 'travel');
    const rows = travel.map((each) =>
      each.id === 'enter:10'
        ? row({
            id: each.id,
            label: 'Ride to Floor 5',
            mark: { text: '[>X<]', label: 'Elevator here' },
            readings: [{ key: 'zone', label: 'Zone', value: 'Living unit' }],
          })
        : row({ id: each.id }),
    );
    const pad = shown(pads.of(portraitOf(tower), travel, rows));
    expect(pad.groups).toHaveLength(1);
    expect(pad.open).toBe(0);
    const keys = pad.groups[0]?.keys ?? [];
    expect(keys.map((key) => key.number)).toEqual(Array.from({ length: 16 }, (_, n) => String(n)));
    expect(keys[5]).toEqual({
      id: 'enter:10',
      number: '5',
      spoken: 'Ride to Floor 5, Elevator here, Zone Living unit',
      current: true,
      visited: false,
    });
    expect(keys[3]?.visited).toBe(true);
  });

  test('past twenty, by tens: 0–9, 10–19 … the last one short; the group shown first holds the car', () => {
    const pad = shown(padOf(towerSnapshot(47, 23)));
    expect(pad.groups.map((group) => group.label)).toEqual(['0–9', '10–19', '20–29', '30–39', '40–46']);
    expect(pad.groups.map((group) => group.keys.length)).toEqual([10, 10, 10, 10, 7]);
    expect(pad.open).toBe(2);
  });

  test('a breached building: the Layers lead the pad, deepest first — in the one group up to twenty, their own group past it', () => {
    const one = shown(padOf(towerSnapshot(8, 0, 10)));
    expect(one.groups.map((group) => group.label)).toEqual(['-0xA–7']);
    expect(one.groups[0]?.keys.slice(0, 2).map((key) => key.number)).toEqual(['-0xA', '-0x9']);
    const tens = shown(padOf(towerSnapshot(16, 0, 10)));
    expect(tens.groups.map((group) => group.label)).toEqual(['-0xA–-0x1', '0–9', '10–15']);
  });

  test('a list that does not go by numbers is no pad', () => {
    expect(padOf(STREET)).toEqual({ shown: false });
  });
});
