import { describe, expect, test } from 'vitest';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { Room } from '#engine/model/Room.ts';
import { RoomCategory } from '#engine/model/RoomCategory.ts';
import { Trace } from '#engine/model/Trace.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { must, realRegistry, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
/** Bright Boulevard's Ornate Sanctum (16 floors, 9 doors): its lobby, and the first room behind the lobby's first door. */
const SEED = new Seed(0x7f3a91c2, 0x0b4de6a8);
const street = must(toStreet(registry.universe(SEED), () => 0).at(-1));
const building = must(street.children()[0]);
const lobby = must(building.children()[0]);
const corridor = must(lobby.children()[0]);
const firstRoom = must(corridor.children()[0]?.children()[0]);

function as<T extends Location>(location: Location | undefined, type: new (...args: never[]) => T): T {
  if (!(location instanceof type)) throw new Error(`expected a ${type.name}`);
  return location;
}

const NOBODY = (): boolean => false;

describe('the door trace (Guide:203-231; RoomCategory.groovy:14-53, AnomalousTrace.groovy:10-15)', () => {
  test('five traces, each with the words the scan shows and the sentence the door tells', () => {
    expect(must(Trace.of('ozone')).name()).toBe('Ozone');
    expect(must(Trace.of('frost')).name()).toBe('Frost');
    expect(must(Trace.of('clicking')).name()).toBe('Clicking');
    expect(must(Trace.of('humming')).name()).toBe('Humming');
    expect(must(Trace.of('stillness')).name()).toBe('Stillness');
    expect(must(Trace.of('stillness')).sentence()).toBe(
      'The air nearby is unnaturally still. Not even the standard system-hum is audible.',
    );
    expect(Trace.of('tearing')).toBeUndefined();
    expect(must(Trace.of('ozone')).equals(must(Trace.of('ozone')))).toBe(true);
  });

  test('the trace is decided by the first room behind the door and never lies: the Guide’s table, on the real lists', () => {
    const table: Record<string, string> = {
      'Memory Well': 'Frost',
      Laboratory: 'Ozone',
      'Neural Link Array': 'Ozone',
      'Bio-Server': 'Ozone',
      'Power Plant': 'Ozone',
      'Processing Core': 'Ozone',
      'Security Station': 'Clicking',
      Armory: 'Clicking',
      'Maintenance Bay': 'Clicking',
      'Supply Node': 'Clicking',
      Barracks: 'Humming',
      'Tactical Hub': 'Humming',
      'Fuel Depot': 'Humming',
      'Credit Hub': 'Humming',
    };
    let seen = 0;
    for (let n = 0; n < 12; n++) {
      const way = must(toStreet(registry.universe(new Seed(n, n * 3)), () => n).at(-1));
      const unit = must(way.children()[n % way.children().length]);
      const doors = must(unit.children()[0]?.children()[0]).children();
      for (const door of doors) {
        const apartment = as(door, Apartment);
        const first = as(apartment.children()[0], Room);
        expect(apartment.behind().equals(first.category())).toBe(true);
        expect(apartment.door().trace().name()).toBe(table[first.type()] ?? 'Stillness');
        seen++;
      }
    }
    expect(seen).toBeGreaterThan(60);
  });

  test('the trace rides on the door for the scan only; the corridor row’s narrative is unchanged (Guide:203-204)', () => {
    const apartment = as(corridor.children()[0], Apartment);
    const door = apartment.door();
    expect(door.narrative()).not.toContain(door.trace().sentence());
    expect(door.sensed()).toContain(door.trace().sentence());
    expect(door.sensed().startsWith(door.narrative().split(' ').slice(0, 3).join(' '))).toBe(true);
  });

  test('a category carries its trace; the guarantee and the trace are read from the lists as name|guarantee|trace', () => {
    const category = new RoomCategory('Archive', undefined, must(Trace.of('stillness')));
    expect(category.trace().name()).toBe('Stillness');
  });
});

describe('scans (Guide:87, 112-116, 227-231; ScanCommand.groovy:29-58)', () => {
  test('a place with nothing to scan answers nothing: the street, the building, the universe', () => {
    expect(street.scan(NOBODY)).toBeUndefined();
    expect(building.scan(NOBODY)).toBeUndefined();
    expect(street.root().scan(NOBODY)).toBeUndefined();
  });

  test('at the elevator the scan is the building’s strata pulse: the floors within two of this one, top first, this one marked (ScanCommand.groovy:136-153)', () => {
    const third = as(building.children()[3], Floor);
    const report = must(third.scan(NOBODY));
    expect(report.title).toBe('NEURAL_PROXIMITY_REPORT');
    expect(report.notes).toEqual(['BUILDING: Ornate Sanctum', 'TOTAL_STRATA: 16 units detected.']);
    expect(report.rows.map((row) => row.cells.map((cell) => `${cell.label}=${cell.value}`))).toEqual([
      ['ID=05', 'FUNCTION=RESEARCH_LAB'],
      ['ID=04', 'FUNCTION=FILTRATION_INTAKE'],
      ['ID=03', 'FUNCTION=FILTRATION_INTAKE'],
      ['ID=02', 'FUNCTION=MECHANICAL_SUMP'],
      ['ID=01', 'FUNCTION=POWER_RELAY'],
    ]);
    expect(report.rows.map((row) => row.current)).toEqual([false, false, true, false, false]);
    expect(report.rows.every((row) => row.note === '')).toBe(true);
    // The lobby sees the two above it and nothing below the ground.
    expect(must(lobby.scan(NOBODY)).rows.map((row) => row.cells[0]?.value)).toEqual(['02', '01', '00']);
  });

  test('in the corridor the scan is the door table: trace, inscription, material, state and the room type behind, each with its sensory line (ScanCommand.groovy:60-134)', () => {
    const floor = as(building.children()[0], Floor);
    floor.enterCorridor();
    const report = must(floor.scan(NOBODY));
    floor.returnToElevator();
    expect(report.title).toBe('[DATA_SUMMARY]');
    expect(report.rows).toHaveLength(9);
    expect(report.rows.map((row) => row.cells.map((cell) => cell.label))).toEqual(
      Array.from({ length: 9 }, () => ['ID', 'TRACE', 'INSCRIPTION', 'MATERIAL', 'STATE', 'ROOM_TYPE']),
    );
    const first = must(report.rows[0]);
    const apartment = as(corridor.children()[0], Apartment);
    expect(first.cells.map((cell) => cell.value)).toEqual([
      '01',
      apartment.door().trace().name(),
      apartment.door().inscription()?.formatted() ?? '',
      apartment.door().material(),
      apartment.door().state(),
      apartment.behind().name(),
    ]);
    expect(first.note).toBe(apartment.door().sensed());
    expect(report.rows.every((row) => !row.current && row.place === undefined)).toBe(true);
    // The same table from the corridor itself.
    expect(must(corridor.scan(NOBODY)).rows).toEqual(report.rows);
  });

  test('in a room the scan is the apartment’s strata overview: every room with the frequency of its name, its wave, whether the traveller has seen it, its type and its name (ScanCommand.groovy:155-206)', () => {
    const apartment = as(corridor.children()[0], Apartment);
    const rooms = apartment.children();
    const seen = (place: Location): boolean => place === rooms[0];
    const report = must(firstRoom.scan(seen));
    expect(report.title).toBe('[STRATA_OVERVIEW]');
    expect(report.rows).toHaveLength(rooms.length);
    expect(report.rows.map((row) => row.place)).toEqual(rooms);
    expect(must(report.rows[0]).cells.map((cell) => [cell.key, cell.label, cell.value])).toEqual([
      ['reading', 'ID', '01'],
      ['reading', 'FREQ', '1944Hz'],
      ['signal', 'WAVE', '~~~'],
      ['stable', 'STATUS', '[VISITED]'],
      ['reading', 'TYPE', 'Power Plant'],
      ['reading', 'IDENTIFIER', 'Grand Power Plant'],
    ]);
    expect(must(report.rows[1]).cells.map((cell) => cell.value)).toContain('[UNSTABLE]');
    expect(must(report.rows[1]).cells.find((cell) => cell.label === 'STATUS')?.key).toBe('reading');
    // The same overview from the apartment, and from the second room.
    expect(must(apartment.scan(seen)).rows).toEqual(report.rows);
    expect(must(rooms[1]?.scan(seen)).rows).toEqual(report.rows);
  });

  test('the wave: a resonant name reads ≈≈≈ in green, a plain one ~~~, an anomaly ### in red; on the real lists all three occur', () => {
    const waves = new Map<string, number>();
    for (let n = 0; n < 40; n++) {
      const way = must(toStreet(registry.universe(new Seed(n * 7, n)), () => n).at(-1));
      const unit = as(way.children()[n % way.children().length], Building);
      for (const door of must(unit.children()[0]?.children()[0]).children()) {
        for (const row of must(door.scan(NOBODY)).rows) {
          const wave = must(row.cells.find((cell) => cell.label === 'WAVE'));
          waves.set(`${wave.key} ${wave.value}`, (waves.get(`${wave.key} ${wave.value}`) ?? 0) + 1);
        }
      }
    }
    expect([...waves.keys()].sort()).toEqual(['alert ###', 'signal ~~~', 'stable ≈≈≈']);
  });
});
