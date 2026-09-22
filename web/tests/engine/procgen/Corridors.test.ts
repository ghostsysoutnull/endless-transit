import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Corridor } from '#engine/model/Corridor.ts';
import { Floor } from '#engine/model/Floor.ts';
import type { Location } from '#engine/model/Location.ts';
import { Room } from '#engine/model/Room.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const library = new ContentLibrary(new BundledContent());
const MATERIALS = library.pairs('themes/doors/materials').map(([name]) => name);
const STATES = library.pairs('themes/doors/states').map(([name]) => name);
const WORDS = library.list('themes/doors/inscriptions');
/** `[WORD]`, `_word_`, `⟨WORD⟩`, `!! WORD !!` — the four inscription styles (DoorInscription.groovy:62-76). */
const STYLED = (word: string): readonly string[] => [
  `[${word}]`,
  `_${word.toLowerCase()}_`,
  `⟨${word}⟩`,
  `!! ${word} !!`,
];

function as<T>(value: unknown, type: new (...args: never[]) => T): T {
  if (!(value instanceof type)) throw new Error(`expected a ${type.name}`);
  return value;
}

/** One corridor of the first building of a street under `n`: the floor, its corridor and its apartments. */
function corridorOf(n: number): {
  building: Building;
  floor: Floor;
  corridor: Corridor;
  apartments: Apartment[];
} {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  const building = as(street.children()[n % street.children().length], Building);
  const floor = as(building.children()[n % building.floors()], Floor);
  const corridor = as(floor.corridor(), Corridor);
  return { building, floor, corridor, apartments: corridor.children().map((each) => as(each, Apartment)) };
}

const sample = Array.from({ length: 300 }, (_, n) => corridorOf(n));
const apartments = sample.flatMap(({ apartments: each }) => each);
const rooms = apartments.flatMap((apartment) => apartment.children().map((room) => as(room, Room)));

describe('a corridor and its doors (Guide, "Reading doors before you open them")', () => {
  test('a corridor has as many apartments as its building says doors per floor; 2 to 20, both ends reached', () => {
    for (const { building, apartments: each } of sample) expect(each).toHaveLength(building.doorsPerFloor());
    const counts = sample.map(({ apartments: each }) => each.length);
    expect(Math.min(...counts)).toBe(2);
    expect(Math.max(...counts)).toBe(20);
  });

  test('a door is a material and a state; the state shows in capitals unless it is Stable (Door.groovy:62-70, DoorAppearance.groovy:22-27)', () => {
    expect(apartments.length).toBeGreaterThan(1_000);
    for (const apartment of apartments) {
      const door = apartment.door();
      expect(MATERIALS).toContain(door.material());
      expect(STATES).toContain(door.state());
      expect(door.brief()).toBe(
        door.state() === 'Stable' ? door.material() : `${door.material()} [${door.state().toUpperCase()}]`,
      );
      const inscription = door.inscription();
      expect(door.description()).toBe(
        inscription === undefined ? door.brief() : `${inscription.formatted()} ${door.brief()}`,
      );
      expect(apartment.name()).toBe(door.description());
    }
    expect(apartments.some((apartment) => apartment.door().state() === 'Stable')).toBe(true);
  });

  test('about one door in five has words on it (Guide:222; Door.groovy:170)', () => {
    const inscribed = apartments.filter((apartment) => apartment.door().inscription() !== undefined);
    expect(inscribed.length / apartments.length).toBeGreaterThan(0.18);
    expect(inscribed.length / apartments.length).toBeLessThan(0.22);
  });

  test('[DATA_VAULT] guarantees a Laboratory or a Bio-Server; !! DANGER !! a Security Station or an Armory; any other word none of those four (Guide:223; CorridorFactory.groovy:183-208)', () => {
    const firstRoomOf = (apartment: Apartment): string => as(apartment.children()[0], Room).type();
    const vaults = apartments.filter((each) => each.door().inscription()?.formatted() === '[DATA_VAULT]');
    const dangers = apartments.filter((each) => each.door().inscription()?.formatted() === '!! DANGER !!');
    const others = apartments.filter(
      (each) => each.door().inscription() !== undefined && !vaults.includes(each) && !dangers.includes(each),
    );
    expect(vaults.length).toBeGreaterThan(20);
    expect(dangers.length).toBeGreaterThan(20);
    expect(others.length).toBeGreaterThan(100);
    for (const each of vaults) expect(['Laboratory', 'Bio-Server']).toContain(firstRoomOf(each));
    for (const each of dangers) expect(['Security Station', 'Armory']).toContain(firstRoomOf(each));
    for (const each of others) {
      expect(['Laboratory', 'Bio-Server', 'Security Station', 'Armory']).not.toContain(firstRoomOf(each));
      const styled = WORDS.flatMap(STYLED);
      expect(styled, must(each.door().inscription()).formatted()).toContain(
        must(each.door().inscription()).formatted(),
      );
    }
    const stylesSeen = new Set(others.map((each) => must(each.door().inscription()).formatted().charAt(0)));
    expect([...stylesSeen].sort()).toEqual(['!', '[', '_', '⟨']);
  });
});

describe('an apartment and its rooms (Guide, "Finding things worth taking")', () => {
  test('1 to 10 rooms per apartment, both ends reached; no two rooms of one apartment share a name', () => {
    const counts = apartments.map((apartment) => apartment.children().length);
    expect(Math.min(...counts)).toBe(1);
    expect(Math.max(...counts)).toBe(10);
    for (const apartment of apartments) {
      const names = apartment.children().map((room) => room.name());
      expect(new Set(names).size, names.join(', ')).toBe(names.length);
      expect(apartment.children().every((room) => room.kind().key() === 'room')).toBe(true);
    }
  });

  test('arriving at an apartment drops the traveller into its first room (Guide:73; NavigationOrchestrator.groovy:184-194)', () => {
    for (const apartment of apartments.slice(0, 200)) {
      expect(apartment.arrival()).toBe(apartment.children()[0]);
      expect(apartment.kind().key()).toBe('apartment');
    }
  });

  test('a room is named "<adjective of the culture> <category of the country’s trait>" (NameGenerator.groovy:127-148)', () => {
    for (const room of rooms) {
      const trait = must(room.vibe()?.mutation()).key();
      const categories = library.pairs(`names/rooms/${trait}`).map(([name]) => name);
      expect(categories, room.name()).toContain(room.type());
      expect(room.name().endsWith(` ${room.type()}`)).toBe(true);
      const adjective = room.name().slice(0, -room.type().length - 1);
      const culture = as(room.parent(), Apartment).culture();
      expect(library.list(`names/buildings/adj/${culture.key()}`), room.name()).toContain(adjective);
    }
  });

  test('an apartment follows the planet’s main culture and era most of the time, drifting to the second by the country’s stability (Guide:312; ApartmentFactory.groovy:26-32)', () => {
    const drifted = apartments.filter((apartment) => !apartment.era().equals(must(apartment.vibe()).era()));
    const expected =
      apartments.map((apartment) => 1 - must(apartment.vibe()).stability()).reduce((a, b) => a + b, 0) /
      apartments.length;
    expect(expected).toBeGreaterThan(0.1);
    expect(Math.abs(drifted.length / apartments.length - expected)).toBeLessThan(0.02);
    const anomalies = apartments.filter((apartment) => apartment.anomaly());
    expect(anomalies.length / apartments.length).toBeGreaterThan(0.005);
    expect(anomalies.length / apartments.length).toBeLessThan(0.02);
  });

  test('the atmo traits: oxygen 12–21%, temperature 5–25 °C, both ends reached; the signal shielded or clear (RoomFactory.groovy:122-124)', () => {
    const oxygen = rooms.map((room) => room.oxygen());
    const temperature = rooms.map((room) => room.temperature());
    expect(rooms.length).toBeGreaterThan(5_000);
    expect(Math.min(...oxygen)).toBe(12);
    expect(Math.max(...oxygen)).toBe(21);
    expect(Math.min(...temperature)).toBe(5);
    expect(Math.max(...temperature)).toBe(25);
    expect(new Set(rooms.map((room) => room.signal()))).toEqual(new Set(['[SHIELDED]', '[CLEAR]']));
    const room = must(rooms[0]);
    expect(room.status()).toBe(`ATMOS: ${String(room.oxygen())}% | TEMP: ${String(room.temperature())}°C`);
    expect(room.facts().map((fact) => fact.label)).toEqual(['TYPE', 'OXY', 'TEMP', 'SIGNAL']);
  });

  test('the room’s words come from its own culture, era and trait: structure, walls with a colour, lighting (Room.groovy:274-276; ThemeService.groovy:99-121)', () => {
    const colours = library.list('themes/colours');
    for (const room of rooms.slice(0, 500)) {
      const apartment = as(room.parent(), Apartment);
      const trait = must(room.vibe()?.mutation()).key();
      const [where, light] = room.description();
      expect(room.description()).toHaveLength(2);
      const structures = library.list(`themes/atmosphere/structures/${trait}`);
      const walls = library.list(`themes/atmosphere/walls/${apartment.culture().key()}`);
      const lighting = library.list(`themes/atmosphere/lighting/${apartment.era().key()}`);
      expect(
        structures.some((each) => where?.startsWith(`You are in ${each}. The walls are `)),
        where,
      ).toBe(true);
      expect(
        colours.some((colour) => walls.some((wall) => where?.endsWith(` ${colour} ${wall}.`))),
        where,
      ).toBe(true);
      expect(
        lighting.some((each) => light === `The space is illuminated by ${each}.`),
        light,
      ).toBe(true);
    }
  });

  test('moves in a room: forward to the next, back to the previous; only the first room has the way out, to the floor (Guide:76, 115; Room.groovy:243-257)', () => {
    const wide = must(apartments.find((apartment) => apartment.children().length >= 3));
    const [first, second, third] = wide.children().map((room) => as(room, Room));
    expect(
      must(first)
        .moves()
        .map((move) => [move.id, move.label]),
    ).toEqual([['forward', 'Go forward']]);
    expect(
      must(second)
        .moves()
        .map((move) => move.id),
    ).toEqual(['back', 'forward']);
    expect(
      must(wide.children().at(-1))
        .moves()
        .map((move) => move.id),
    ).toEqual(['back']);
    expect(must(first).move('forward')).toBe(second);
    expect(must(second).move('back')).toBe(first);
    expect(must(second).move('forward')).toBe(third);
    expect(must(first).move('back')).toBeUndefined();
    expect(must(first).exit()).toBe(wide.parent()?.arrival());
    expect(must(first).exit()?.kind().key()).toBe('floor');
    expect(must(first).leaveLabel()).toBe('Exit Apartment');
    expect(must(second).exit()).toBeUndefined();
    expect(must(second).leave()).toBeUndefined();
    const single = must(apartments.find((apartment) => apartment.children().length === 1));
    expect(must(single.children()[0]).moves()).toEqual([]);
    expect(must(single.children()[0]).listing()).toEqual([]);
  });

  test('a room lists nothing, and the apartment is where its position is counted', () => {
    const room: Location = must(rooms[10]);
    expect(room.listing()).toEqual([]);
    expect(room.kind().indexLabel()).toBe('CELL');
    expect(room.kind().icon()).toBe('□');
    expect(must(room.parent()).kind().indexLabel()).toBe('UNIT');
  });
});
