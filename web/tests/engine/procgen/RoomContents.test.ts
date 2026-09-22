import { describe, expect, test } from 'vitest';
import { BundledContent } from '#content/BundledContent.ts';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { Culture } from '#engine/model/Culture.ts';
import { Era } from '#engine/model/Era.ts';
import { Floor } from '#engine/model/Floor.ts';
import { Room } from '#engine/model/Room.ts';
import { Trait } from '#engine/model/Trait.ts';
import { Atmospheres } from '#engine/procgen/Atmospheres.ts';
import { Furnishings } from '#engine/procgen/Furnishings.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { MemoryWarningSink } from '#tests/support/MemoryWarningSink.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const warnings = new MemoryWarningSink();
const registry = realRegistry(warnings);
const library = new ContentLibrary(new BundledContent());
const CULTURES = library.index('themes/cultures');
const ERAS = library.index('themes/timelines');
const CONDITIONS = library.list('themes/conditions');

function as<T>(value: unknown, type: new (...args: never[]) => T): T {
  if (!(value instanceof type)) throw new Error(`expected a ${type.name}`);
  return value;
}

function roomsOf(n: number): Room[] {
  const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
  const building = as(street.children()[n % street.children().length], Building);
  const floor = as(building.children()[n % building.floors()], Floor);
  return floor
    .corridor()
    .children()
    .flatMap((apartment) => apartment.children().map((room) => as(room, Room)));
}

const rooms = Array.from({ length: 150 }, (_, n) => roomsOf(n)).flat();
const apartmentOf = (room: Room): Apartment => as(room.parent(), Apartment);

describe('furniture is not loot (Guide:171-173; ThemeService.groovy:173-194)', () => {
  test('one to three pieces per room, both ends reached, each "<condition> <culture item>", no piece twice in a room', () => {
    expect(rooms.length).toBeGreaterThan(5_000);
    const counts = rooms.map((room) => room.furniture().length);
    expect(Math.min(...counts)).toBe(1);
    expect(Math.max(...counts)).toBe(3);
    for (const room of rooms) {
      const items = library.list(`themes/cultures/${apartmentOf(room).culture().key()}`);
      expect(new Set(room.furniture()).size, room.furniture().join(', ')).toBe(room.furniture().length);
      for (const piece of room.furniture()) {
        const cut = piece.indexOf(' ');
        expect(CONDITIONS, piece).toContain(piece.slice(0, cut));
        expect(items, piece).toContain(piece.slice(cut + 1));
      }
    }
  });

  test('a furnishing never doubles its first word ("flickering flickering light tube" — HK-016 F2), and is never an object', () => {
    for (const room of rooms) {
      for (const piece of room.furniture()) {
        const [first, second] = piece.split(' ');
        expect(first, piece).not.toBe(second);
        expect(
          room.objects().some((relic) => relic.name() === piece),
          piece,
        ).toBe(false);
      }
    }
  });

  test('two conditions in a row when the first would double the item — the next one is taken', () => {
    const furnishings = new Furnishings(
      new ContentLibrary(
        new MemoryContentSource({
          'themes/conditions.txt': 'sagging\nsealed\n',
          'themes/cultures/rust.txt': 'sagging cot\nsealed drum\n',
        }),
      ),
    );
    for (let n = 0; n < 40; n++) {
      for (const piece of furnishings.of(new Seed(n, n), new Culture('rust', 'red'), 2)) {
        expect(['sealed sagging cot', 'sagging sealed drum']).toContain(piece);
      }
    }
  });
});

describe('the atmosphere: walls from the culture, lighting from the era, structure from the trait — unless glitched (ThemeService.groovy:87-124)', () => {
  const own = (room: Room): { walls: boolean; lighting: boolean; structure: boolean } => {
    const apartment = apartmentOf(room);
    const trait = must(room.vibe()?.mutation()).key();
    return {
      walls: library
        .list(`themes/atmosphere/walls/${apartment.culture().key()}`)
        .includes(room.atmosphere().walls),
      lighting: library
        .list(`themes/atmosphere/lighting/${apartment.era().key()}`)
        .includes(room.atmosphere().lighting),
      structure: library.list(`themes/atmosphere/structures/${trait}`).includes(room.atmosphere().structure),
    };
  };

  test('most rooms speak their own culture, era and trait; one in twenty is glitched in one part or another, an anomaly nearly always', () => {
    const plain = rooms.filter((room) => !apartmentOf(room).anomaly());
    const anomalies = rooms.filter((room) => apartmentOf(room).anomaly());
    expect(anomalies.length).toBeGreaterThan(30);
    const foreign = (sample: readonly Room[]): number =>
      sample.filter((room) => Object.values(own(room)).some((isOwn) => !isOwn)).length / sample.length;
    // 1 in 20 glitched, each of three parts swapped 1 in 2 (and a swap may land on the same key): ≈ 3.5–4.5%.
    expect(foreign(plain)).toBeGreaterThan(0.025);
    expect(foreign(plain)).toBeLessThan(0.055);
    // An anomaly is always glitched: only 1 in 8 keeps all three parts, less the swaps that land home.
    expect(foreign(anomalies)).toBeGreaterThan(0.7);
    const wallsForeign = plain.filter((room) => !own(room).walls);
    expect(wallsForeign.length).toBeGreaterThan(20);
    for (const room of wallsForeign) {
      expect(
        CULTURES.some((culture) =>
          library.list(`themes/atmosphere/walls/${culture}`).includes(room.atmosphere().walls),
        ),
        room.atmosphere().walls,
      ).toBe(true);
    }
    for (const room of plain.filter((room) => !own(room).lighting)) {
      expect(
        ERAS.some((era) =>
          library.list(`themes/atmosphere/lighting/${era}`).includes(room.atmosphere().lighting),
        ),
        room.atmosphere().lighting,
      ).toBe(true);
    }
    for (const room of plain.filter((room) => !own(room).structure)) {
      expect(
        ['abyssal', 'Singularity'].some((key) =>
          library.list(`themes/atmosphere/structures/${key}`).includes(room.atmosphere().structure),
        ),
        room.atmosphere().structure,
      ).toBe(true);
    }
  });

  test('the colour is one of the eight (RoomFactory.groovy:27-28)', () => {
    const colours = library.list('themes/colours');
    for (const room of rooms) expect(colours).toContain(room.atmosphere().colour);
    expect(new Set(rooms.map((room) => room.atmosphere().colour)).size).toBe(8);
  });

  test('no [THEME_WARN] ever fires on the bundled content', () => {
    expect(warnings.messages()).toEqual([]);
  });

  test('a missing file is never silent: the first key of the index stands in, and the sink hears why (Guide:319)', () => {
    const sink = new MemoryWarningSink();
    const atmospheres = new Atmospheres(
      new ContentLibrary(
        new MemoryContentSource({
          'themes/cultures/index.txt': 'monolith\nrust\n',
          'themes/timelines/index.txt': 'analog\n',
          'themes/colours.txt': 'grey\n',
          'themes/atmosphere/walls/monolith.txt': 'bare concrete\n',
          'themes/atmosphere/lighting/index.txt': 'analog\n',
          'themes/atmosphere/lighting/analog.txt': 'a crt glow\n',
          'themes/atmosphere/structures/index.txt': 'Military\n',
          'themes/atmosphere/structures/Military.txt': 'a bunker\n',
        }),
      ),
      sink,
    );
    const drawn = atmospheres.of(new Seed(1, 2), {
      culture: new Culture('rust', 'red'),
      era: new Era('analog'),
      trait: new Trait('Military'),
      anomaly: false,
    });
    expect(drawn).toEqual({
      structure: 'a bunker',
      colour: 'grey',
      walls: 'bare concrete',
      lighting: 'a crt glow',
    });
    expect(sink.messages()).toEqual([
      "[THEME_WARN] no walls file for 'rust' — falling back to 'monolith' (themes/atmosphere/walls/rust.txt)",
    ]);
  });
});
