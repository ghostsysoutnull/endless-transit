import { describe, expect, test } from 'vitest';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import type { PlanFigure } from '#engine/model/PlanFigure.ts';
import { Room } from '#engine/model/Room.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';
import { readPortrait } from '#tests/support/readPortrait.ts';

const registry = realRegistry();

function as<T>(value: unknown, type: new (...args: never[]) => T): T {
  if (!(value instanceof type)) throw new Error(`expected a ${type.name}`);
  return value;
}

/** The first apartment of a sampled world with at least this many rooms. */
function apartmentWith(rooms: number): Apartment {
  for (let n = 0; n < 200; n++) {
    const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
    const building = as(street.children()[0], Building);
    const floor = as(building.children()[0], Floor);
    const found = floor
      .corridor()
      .children()
      .map((each) => as(each, Apartment))
      .find((apartment) => apartment.roomCount() >= rooms);
    if (found !== undefined) return found;
  }
  throw new Error(`no apartment of ${String(rooms)} rooms`);
}

function roomsOf(apartment: Apartment): Room[] {
  return apartment.children().map((room) => as(room, Room));
}

/** The traveller has been to exactly these places. */
function seenOnly(...places: Location[]): (place: Location) => boolean {
  return (place) => places.includes(place);
}

function planOf(room: Room, seen: (place: Location) => boolean): PlanFigure {
  const read = readPortrait(room.portrait(seen));
  if (read.drawn !== 'plan') throw new Error(`expected the plan, got ${read.drawn}`);
  return read.plan;
}

describe('a room is drawn as its apartment’s plan (U03)', () => {
  test('every room of the apartment in order, by address and name, and the one you stand in', () => {
    const rooms = roomsOf(apartmentWith(4));
    const second = must(rooms[1]);
    const plan = planOf(second, seenOnly(...rooms.slice(0, 2)));
    expect(plan.rooms.map((room) => room.address)).toEqual(rooms.map((room) => room.address().toString()));
    expect(plan.rooms.map((room) => room.name)).toEqual(rooms.map((room) => room.name()));
    expect(plan.here).toBe(second.address().toString());
  });

  test('the fog: a room visited is seen, a room a visited one leads to is known, the rest are fog', () => {
    const rooms = roomsOf(apartmentWith(4));
    const plan = planOf(must(rooms[0]), seenOnly(must(rooms[0])));
    expect(plan.rooms.map((room) => room.sight)).toEqual([
      'visited',
      'known',
      ...rooms.slice(2).map(() => 'fog'),
    ]);
  });

  test('relic marks: what lies in a visited room, nothing shown in a room not visited; a take lowers them', () => {
    const rooms = roomsOf(apartmentWith(3));
    const first = must(rooms[0]);
    const lying = first.objects().length;
    const plan = planOf(first, seenOnly(first));
    expect(plan.rooms.map((room) => room.relics)).toEqual([lying, ...rooms.slice(1).map(() => 0)]);
    if (lying > 0) {
      first.capture(0);
      expect(planOf(first, seenOnly(first)).rooms[0]?.relics).toBe(lying - 1);
    }
  });

  test('a surveyed apartment: every room known, the relics of every room marked', () => {
    const apartment = apartmentWith(4);
    const rooms = roomsOf(apartment);
    const first = must(rooms[0]);
    first.survey();
    const plan = planOf(first, seenOnly(first));
    expect(plan.rooms.map((room) => room.sight)).toEqual(['visited', ...rooms.slice(1).map(() => 'known')]);
    expect(plan.rooms.map((room) => room.relics)).toEqual(rooms.map((room) => room.objects().length));
  });

  test('the room’s look: the keys its walls and lighting came from, cold below 8 °C, its furniture, the anomaly', () => {
    const rooms = roomsOf(apartmentWith(1));
    for (const room of rooms) {
      const look = planOf(room, seenOnly(room)).look;
      expect(look.walls()).toBe(room.atmosphere().keys.walls);
      expect(look.light()).toBe(room.atmosphere().keys.light);
      expect(look.cold()).toBe(room.temperature() < 8);
      expect(look.furniture()).toBe(room.furniture().length);
      expect(look.anomaly()).toBe(as(room.parent(), Apartment).anomaly());
    }
  });
});

describe('a scan resolves the plan and the apartment keeps it (U03, Decision 9)', () => {
  test('unsurveyed it remembers nothing; surveyed from any of its rooms it remembers that, and a save takes it back', () => {
    const apartment = apartmentWith(2);
    expect(apartment.remember()).toBeUndefined();
    must(roomsOf(apartment)[1]).survey();
    const memento = must(apartment.remember());
    const again = apartmentWith(2);
    expect(again).not.toBe(apartment);
    expect(again.recall(memento)).toBe(true);
    expect(again.remember()).toBe(memento);
  });

  test('a memento it could not have written is refused whole', () => {
    for (const strange of ['{"surveyed":false}', '{"surveyed":true,"x":1}', 'surveyed', '{}', '']) {
      expect(apartmentWith(2).recall(strange), strange).toBe(false);
    }
  });
});

describe('where a move leads, asked without making it (U03: a move option carries its place)', () => {
  test('a room leads forward to the next and back to the one before; nowhere past the ends', () => {
    const rooms = roomsOf(apartmentWith(3));
    expect(must(rooms[1]).leadsTo('forward')).toBe(rooms[2]);
    expect(must(rooms[1]).leadsTo('back')).toBe(rooms[0]);
    expect(must(rooms[0]).leadsTo('back')).toBeUndefined();
  });

  test('asking the elevator where the corridor is does not enter it', () => {
    const street = must(toStreet(registry.universe(sampleSeed(3)), () => 3).at(-1));
    const floor = as(as(street.children()[0], Building).children()[0], Floor);
    expect(floor.leadsTo('corridor')).toBe(floor);
    expect(floor.listing()).toEqual([]);
  });
});
