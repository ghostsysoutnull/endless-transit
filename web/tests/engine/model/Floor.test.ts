import { describe, expect, test } from 'vitest';
import { Building } from '#engine/model/Building.ts';
import { Corridor } from '#engine/model/Corridor.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { Street } from '#engine/model/Street.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { CountingChildSource } from '#tests/support/CountingChildSource.ts';
import { must } from '#tests/support/world.ts';

const FLOORS = 4;

/** A street (depth 0) with one four-floor building; every floor has a corridor with nothing behind its doors yet. */
function building(): { building: Building; source: CountingChildSource } {
  const source: CountingChildSource = new CountingChildSource((parent: Location) => {
    const origin = (index: number) => ({ seed: parent.seed().branch(index), index, children: source });
    switch (parent.depth()) {
      case 0:
        return [
          new Building(
            { ...origin(0), parent },
            { name: 'Unit Zero', landmark: false, floors: FLOORS, doorsPerFloor: 2 },
          ),
        ];
      case 1:
        return Array.from(
          { length: FLOORS },
          (_, number) =>
            new Floor(
              { ...origin(number), parent: parent as Building },
              { number, zone: number === 0 ? 'TRANSIT_LOBBY' : 'LIVING_UNIT', sentence: 'The air hums.' },
            ),
        );
      case 2:
        return [new Corridor({ ...origin(0), parent: parent as Floor }, { sentence: 'A long corridor' })];
      default:
        return [];
    }
  });
  const street = new Street(
    { parent: undefined, seed: new Seed(3, 4), index: 0, children: source },
    { name: 'High Way' },
  );
  return { building: street.children()[0] as Building, source };
}

function floor(number: number): Floor {
  return building().building.children()[number] as Floor;
}

describe('Floor — one child, the corridor; a number that is its place on the building’s list', () => {
  test('floor n is child n of the building, counts from 0, and its ordinal is its number (Guide:111)', () => {
    const { building: unit } = building();
    expect(unit.children().map((each) => each.name())).toEqual(['Floor 0', 'Floor 1', 'Floor 2', 'Floor 3']);
    expect(unit.children().map((each) => each.ordinal())).toEqual([0, 1, 2, 3]);
    expect(unit.listing().map((each) => each.name())).toEqual(['Floor 3', 'Floor 2', 'Floor 1', 'Floor 0']);
    expect(floor(2).number()).toBe(2);
    expect(floor(2).kind().key()).toBe('floor');
  });

  test('the list names the ground floor Lobby and the top floor Peak; the zone, integrity and resonance ride beside (Building.groovy:208-217)', () => {
    expect(floor(0).callSign()).toBe('Lobby');
    expect(floor(3).callSign()).toBe('Peak');
    expect(floor(1).callSign()).toBe('Floor 1');
    expect(
      floor(1)
        .readings()
        .map((fact) => [fact.key, fact.label, fact.value]),
    ).toEqual([
      ['zone', 'FUNCTION', 'LIVING_UNIT'],
      ['reading', 'ST', '100%'],
      ['reading', 'RES', `${String(floor(1).resonance())}Hz`],
    ]);
  });

  test('a corridor is never stood in: arriving at it lands on its floor', () => {
    const second = floor(1);
    const corridor = must(second.children()[0]);
    expect(corridor.kind().key()).toBe('corridor');
    expect(corridor.arrival()).toBe(second);
    expect(second.corridor()).toBe(corridor);
  });
});

describe('Building — where its elevator stands (Building.groovy:24, 189; Floor.groovy:144)', () => {
  test('the elevator starts at the lobby; arriving at a floor calls it there; the list marks that floor as current', () => {
    const { building: unit } = building();
    expect(unit.children().map((each) => each.current())).toEqual([true, false, false, false]);
    expect(unit.remember()).toBeUndefined();
    const third = must(unit.children()[2]);
    expect(third.arrive()).toBe(third);
    expect(unit.children().map((each) => each.current())).toEqual([false, false, true, false]);
    expect(unit.remember()).toBe('2');
    // Arriving at the corridor lands on its floor and calls the elevator there too.
    expect(must(unit.children()[1]?.children()[0]).arrive()).toBe(unit.children()[1]);
    expect(unit.remember()).toBe('1');
    // Leaving a floor, or walking its corridor, moves nothing: the elevator waits where it was called.
    must(unit.children()[1]).move('corridor');
    must(unit.children()[1]).leave();
    expect(unit.remember()).toBe('1');
  });

  test('recall: the saved floor number puts the elevator there; past the top, below the ground or not a floor number is refused', () => {
    const { building: unit } = building();
    expect(unit.recall('3')).toBe(true);
    expect(must(unit.children()[3]).current()).toBe(true);
    expect(unit.remember()).toBe('3');
    for (const bad of ['4', '-1', '1.5', 'x', '', '03', ' 1', '1e0']) {
      expect(unit.recall(bad), bad).toBe(false);
      expect(unit.remember(), bad).toBe('3');
    }
    expect(unit.recall('0')).toBe(true);
    expect(unit.remember()).toBeUndefined();
  });
});

describe('Floor — the elevator (FloorState, Phase 8: the floor asks its state, nobody asks the state its class)', () => {
  test('a fresh floor is in the elevator: up, down and the corridor on offer; nothing listed; nothing to remember', () => {
    const middle = floor(1);
    expect(middle.moves().map((move) => move.id)).toEqual(['up', 'down', 'corridor']);
    expect(middle.moves().map((move) => move.label)).toEqual(['Go Up', 'Go Down', 'Enter Corridor']);
    // Each move names the one that undoes it — the screen never rests the focus on that one after it vanishes.
    expect(middle.moves().map((move) => move.opposite)).toEqual(['down', 'up', 'elevator']);
    expect(middle.listing()).toEqual([]);
    expect(middle.remember()).toBeUndefined();
    expect(middle.childrenHeading()).toBe('');
  });

  test('the ground floor has no down and the top floor no up (ElevatorState.groovy:27-33)', () => {
    expect(
      floor(0)
        .moves()
        .map((move) => move.id),
    ).toEqual(['up', 'corridor']);
    expect(
      floor(FLOORS - 1)
        .moves()
        .map((move) => move.id),
    ).toEqual(['down', 'corridor']);
  });

  test('up and down are the neighbouring floors of the same building, still in the elevator', () => {
    const middle = floor(1);
    const above = must(middle.move('up'));
    expect(above.name()).toBe('Floor 2');
    expect(above.parent()).toBe(middle.parent());
    expect(must(above.move('down'))).toBe(middle);
    expect(floor(0).move('down')).toBeUndefined();
    expect(floor(FLOORS - 1).move('up')).toBeUndefined();
    expect(middle.move('elevator')).toBeUndefined();
  });

  test('the diagnostic suite: what the elevator shows about the floor (ElevatorState.groovy:56-75)', () => {
    const middle = floor(1);
    expect(middle.description()).toEqual([
      'Floor 1. The air hums.',
      'Local signal is STABLE. Corridor access authorized.',
    ]);
    expect(middle.status()).toBe('SYSTEM_DIAGNOSTIC: [NOMINAL]');
    // No planet above this test's street: the vibe readings are simply absent, the label rule is still there.
    expect(middle.facts()).toEqual([]);
  });

  test('leaving the elevator goes to the building', () => {
    const middle = floor(1);
    expect(middle.exit()).toBe(middle.parent());
    expect(middle.leave()).toBe(middle.parent());
    expect(middle.leaveLabel()).toBe('Leave Floor');
  });
});

describe('Floor — the corridor', () => {
  test('entering the corridor stays on the floor: the doors are listed, the one move is back to the elevator, and the mode is remembered', () => {
    const middle = floor(1);
    expect(middle.move('corridor')).toBe(middle);
    expect(middle.remember()).toBe('corridor');
    expect(middle.moves().map((move) => [move.id, move.label, move.opposite])).toEqual([
      ['elevator', 'Back to Elevator', 'corridor'],
    ]);
    expect(middle.listing()).toBe(middle.corridor().children());
    expect(middle.childrenHeading()).toBe(middle.corridor().childrenHeading());
    expect(middle.approachVerb()).toBe(middle.corridor().approachVerb());
    expect(middle.description()).toEqual(middle.corridor().description());
    expect(middle.status()).toBe(middle.corridor().status());
    expect(middle.move('up')).toBeUndefined();
  });

  test('back to the elevator: the same floor, in the elevator again', () => {
    const middle = floor(1);
    middle.move('corridor');
    expect(middle.move('elevator')).toBe(middle);
    expect(middle.remember()).toBeUndefined();
    expect(middle.moves().map((move) => move.id)).toEqual(['up', 'down', 'corridor']);
  });

  test('leaving from the corridor hands the floor back to the elevator on the way out (HK-019; Guide:113)', () => {
    const middle = floor(1);
    middle.move('corridor');
    expect(middle.exit()).toBe(middle.parent());
    expect(middle.remember()).toBe('corridor');
    expect(middle.leave()).toBe(middle.parent());
    expect(middle.remember()).toBeUndefined();
  });

  test('admits: a path continues below a floor only in its corridor, and only into the corridor; a building only into the floor its elevator stands at', () => {
    const { building: unit } = building();
    const second = must(unit.children()[1]) as Floor;
    expect(second.admits(second.corridor())).toBe(false);
    second.enterCorridor();
    expect(second.admits(second.corridor())).toBe(true);
    expect(second.admits(second)).toBe(false);
    expect(unit.admits(must(unit.children()[0]))).toBe(true);
    expect(unit.admits(second)).toBe(false);
    second.arrive();
    expect(unit.admits(second)).toBe(true);
    expect(unit.admits(must(unit.children()[0]))).toBe(false);
  });

  test('recall: the saved mode id puts the floor back in that mode; an unknown id is refused', () => {
    const middle = floor(1);
    expect(middle.recall('corridor')).toBe(true);
    expect(middle.moves().map((move) => move.id)).toEqual(['elevator']);
    expect(middle.recall('elevator')).toBe(true);
    expect(middle.moves().map((move) => move.id)).toEqual(['up', 'down', 'corridor']);
    expect(middle.recall('lobby')).toBe(false);
    expect(middle.moves().map((move) => move.id)).toEqual(['up', 'down', 'corridor']);
  });

  test('every move a floor offers can be made, at the elevator and in the corridor — the offer and the making have one owner', () => {
    for (let number = 0; number < FLOORS; number++) {
      const each = floor(number);
      for (const move of each.moves()) {
        expect(each.move(move.id), `${each.name()} at the elevator: ${move.id}`).toBeDefined();
      }
      each.enterCorridor();
      for (const move of each.moves()) {
        expect(each.move(move.id), `${each.name()} in the corridor: ${move.id}`).toBeDefined();
      }
    }
  });

  test('the corridor is generated only when the floor needs it', () => {
    const { building: unit, source } = building();
    const second = must(unit.children()[1]) as Floor;
    expect(source.asked(second.address().toString())).toBe(0);
    second.moves();
    expect(source.asked(second.address().toString())).toBe(0);
    second.move('corridor');
    second.listing();
    expect(source.asked(second.address().toString())).toBe(1);
    expect(must(unit.children()[2]).populated()).toBe(false);
  });
});
