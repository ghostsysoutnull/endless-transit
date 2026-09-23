import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Apartment } from '#engine/model/Apartment.ts';
import { Building } from '#engine/model/Building.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { Floor } from '#engine/model/Floor.ts';
import { Glitch } from '#engine/model/Glitch.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import { RoomCategory } from '#engine/model/RoomCategory.ts';
import { Room } from '#engine/model/Room.ts';
import { Doors } from '#engine/procgen/Doors.ts';
import { Trace } from '#engine/model/Trace.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { must, realRegistry, sampleSeed, toStreet } from '#tests/support/world.ts';

const registry = realRegistry();
const GLITCH_CHARS = '█▓▒░/\\%!$#*';

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

/** The rooms of anomalous apartments, at least `least` of them, walking whole buildings (one in a hundred apartments). */
function anomalyRooms(least: number): Room[] {
  const found: Room[] = [];
  for (let n = 0; found.length < least; n++) {
    const street = must(toStreet(registry.universe(sampleSeed(n)), () => n).at(-1));
    const building = as(street.children()[n % street.children().length], Building);
    for (const floor of building.children()) {
      for (const apartment of as(floor, Floor).corridor().children()) {
        if (as(apartment, Apartment).anomaly())
          found.push(...apartment.children().map((room) => as(room, Room)));
      }
      if (found.length >= least) break;
    }
  }
  return found;
}

/** How many non-space characters of `original` `glitched` replaced, and how many there were. */
function replaced(original: string, glitched: string): { changed: number; of: number } {
  let changed = 0;
  let of = 0;
  for (let i = 0; i < original.length; i++) {
    if (original[i] === ' ') continue;
    of++;
    if (glitched[i] !== original[i]) changed++;
  }
  return { changed, of };
}

const rooms = Array.from({ length: 120 }, (_, n) => roomsOf(n)).flat();
const anomalies = rooms.filter((room) => as(room.parent(), Apartment).anomaly());
const sound = rooms.filter((room) => !as(room.parent(), Apartment).anomaly());

describe('the glitch (Terminal.groovy:173-183, seeded here on the place instead of the clock)', () => {
  const glitch = new Glitch();
  const text = 'the quick brown fox jumps over the lazy dog, again and again and again and again';

  test('replaces about the given share of characters with static, never a space, and the same way every time', () => {
    const seed = new Seed(5, 6);
    const once = glitch.mangle(text, 0.3, seed);
    expect(glitch.mangle(text, 0.3, seed)).toBe(once);
    expect(once).toHaveLength(text.length);
    let replaced = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === ' ') expect(once[i]).toBe(' ');
      else if (once[i] !== text[i]) {
        replaced++;
        expect(GLITCH_CHARS).toContain(once[i] ?? '');
      }
    }
    expect(replaced / text.replaceAll(' ', '').length).toBeGreaterThan(0.15);
    expect(replaced / text.replaceAll(' ', '').length).toBeLessThan(0.45);
    expect(glitch.mangle(text, 0, seed)).toBe(text);
    expect(glitch.mangle(text, 1, seed)).not.toMatch(/[a-z]/);
  });
});

describe('a room’s text (Room.groovy:116-134, 262-297)', () => {
  test('the diagnostic: TEMPORAL_MARKER (the apartment’s era, Decision 7), TYPE, OXY, TEMP, SIGNAL and RESONANCE — [STABLE] in green, [DEGRADED] in red under an anomaly (Room.groovy:129)', () => {
    expect(anomalies.length).toBeGreaterThan(20);
    for (const room of sound.slice(0, 200)) {
      expect(room.facts().map((fact) => fact.label)).toEqual([
        'TEMPORAL_MARKER',
        'TYPE',
        'OXY',
        'TEMP',
        'SIGNAL',
        'RESONANCE',
      ]);
      expect(room.facts().at(-1)).toEqual({ key: 'stable', label: 'RESONANCE', value: '[STABLE]' });
    }
    for (const room of anomalies) {
      expect(room.facts().at(-1)).toEqual({ key: 'alert', label: 'RESONANCE', value: '[DEGRADED]' });
    }
  });

  test('under an anomaly the interpretation is glitched — structure at 0.2, walls at 0.1, lighting at 0.3 — and reads the same every time (Room.groovy:268-272)', () => {
    let glitchedLines = 0;
    for (const room of anomalies) {
      const { structure, colour, walls, lighting } = room.atmosphere();
      const [where, light] = room.description();
      expect(room.description()).toEqual(room.description());
      expect(where).toMatch(/^You are in .*\. The walls are .* .*\.$/);
      expect(light).toMatch(/^The space is illuminated by .*\.$/);
      if (where !== `You are in ${structure}. The walls are ${colour} ${walls}.`) glitchedLines++;
      if (light !== `The space is illuminated by ${lighting}.`) glitchedLines++;
      expect(where?.length).toBe(`You are in ${structure}. The walls are ${colour} ${walls}.`.length);
      expect(light?.length).toBe(`The space is illuminated by ${lighting}.`.length);
      expect(where).toContain('You are in ');
      expect(where).toContain('. The walls are ');
      expect(where).toContain(` ${colour} `);
      expect(light).toContain('The space is illuminated by ');
    }
    expect(glitchedLines / (anomalies.length * 2)).toBeGreaterThan(0.9);
    for (const room of sound.slice(0, 300)) {
      for (const line of room.description()) {
        for (const char of GLITCH_CHARS) expect(line, line).not.toContain(char);
      }
    }
  });

  test('each part has its own share — the structure loses about a fifth of its characters, the walls a tenth, the lighting three in ten (Room.groovy:269-271)', () => {
    const share = {
      structure: { changed: 0, of: 0 },
      walls: { changed: 0, of: 0 },
      lighting: { changed: 0, of: 0 },
    };
    const many = anomalyRooms(700);
    expect(many.length).toBeGreaterThanOrEqual(700);
    for (const room of many) {
      const { structure, walls, lighting } = room.atmosphere();
      const [where = '', light = ''] = room.description();
      const cut = (line: string, from: number, part: string): string => line.slice(from, from + part.length);
      const parts = {
        structure: replaced(structure, cut(where, 'You are in '.length, structure)),
        walls: replaced(walls, cut(where, where.length - 1 - walls.length, walls)),
        lighting: replaced(lighting, cut(light, 'The space is illuminated by '.length, lighting)),
      };
      for (const part of ['structure', 'walls', 'lighting'] as const) {
        share[part].changed += parts[part].changed;
        share[part].of += parts[part].of;
      }
    }
    for (const part of ['structure', 'walls', 'lighting'] as const)
      expect(share[part].of).toBeGreaterThan(2000);
    expect(share.structure.changed / share.structure.of).toBeGreaterThan(0.15);
    expect(share.structure.changed / share.structure.of).toBeLessThan(0.25);
    expect(share.walls.changed / share.walls.of).toBeGreaterThan(0.05);
    expect(share.walls.changed / share.walls.of).toBeLessThan(0.15);
    expect(share.lighting.changed / share.lighting.of).toBeGreaterThan(0.25);
    expect(share.lighting.changed / share.lighting.of).toBeLessThan(0.35);
  });

  test('only a building and what is under it are indoors — the telemetry pane’s rule (TelemetryComponent.groovy:48-55)', () => {
    const room = must(rooms[0]);
    const trail = room.trail();
    expect(trail.map((place) => place.indoors())).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
    ]);
    expect(must(trail[8]).kind().key()).toBe('building');
  });

  test('what a place holds is the place’s answer: a room its objects and furniture, every kind above it nothing', () => {
    const room = must(rooms[0]);
    expect(room.contents()).toEqual({ objects: room.objects(), furniture: room.furniture() });
    expect(must(room.contents()).furniture.length).toBeGreaterThan(0);
    for (const place of room.trail().slice(0, -1)) expect(place.contents(), place.kind().key()).toBeNull();
  });
});

describe('a door’s full appearance (Door.groovy:79-92; DoorAppearance.groovy:32-51; DoorInscription.groovy:29-37)', () => {
  const doors = new Doors(
    new ContentLibrary(
      new MemoryContentSource({
        'themes/doors/materials.txt': 'Heavy Bulkhead|A heavily reinforced poly-slab bulkhead.\n',
        'themes/doors/states.txt': 'Cold|The frame is ice-cold to the touch.\n',
        'themes/doors/inscriptions.txt': 'LATTICE\n',
      }),
    ),
  );
  const [stamped, scrawled, etched, burned] = INSCRIPTION_STYLES;

  test('the narrative is the material’s sentence, the state’s, and how the word was applied when there is one', () => {
    const plain = doors.of(
      new Seed(1, 1),
      new RoomCategory('Archive', undefined, must(Trace.of('stillness'))),
    );
    expect(plain.brief()).toBe('Heavy Bulkhead [COLD]');
    expect(plain.narrative()).toBe(
      plain.inscription() === undefined
        ? 'A heavily reinforced poly-slab bulkhead. The frame is ice-cold to the touch.'
        : `A heavily reinforced poly-slab bulkhead. The frame is ice-cold to the touch. ${must(plain.inscription()).narrative()}`,
    );
    const vault = doors.of(
      new Seed(2, 2),
      new RoomCategory(
        'Laboratory',
        new DoorInscription('DATA_VAULT', must(stamped)),
        must(Trace.of('ozone')),
      ),
    );
    if (vault.inscription() !== undefined) {
      expect(vault.narrative()).toBe(
        "A heavily reinforced poly-slab bulkhead. The frame is ice-cold to the touch. The word 'DATA_VAULT' is stamped into the metal in block letters.",
      );
    }
  });

  test('the four styles each tell how the word was applied', () => {
    expect(new DoorInscription('DANGER', must(stamped)).narrative()).toBe(
      "The word 'DANGER' is stamped into the metal in block letters.",
    );
    expect(new DoorInscription('IT_HUMS', must(scrawled)).narrative()).toBe(
      "The word 'it_hums' is scrawled across the surface in jagged, desperate lines.",
    );
    expect(new DoorInscription('LATTICE', must(etched)).narrative()).toBe(
      "The word 'LATTICE' is finely etched into the frame, appearing almost as a structural glyph.",
    );
    expect(new DoorInscription('DANGER', must(burned)).narrative()).toBe(
      "The word 'DANGER' is burned into the material with a high-intensity plasma torch.",
    );
  });

  test('on the real lists every door of a corridor has a two-sentence narrative, three with words on it, and its row reads it', () => {
    for (const room of rooms.slice(0, 300)) {
      const apartment = as(room.parent(), Apartment);
      const door = apartment.door();
      const sentences = door.narrative().split('. ').length;
      expect(sentences, door.narrative()).toBe(door.inscription() === undefined ? 2 : 3);
      expect(apartment.readings()).toEqual([
        { key: 'narrative', label: 'APPEARANCE', value: door.narrative() },
      ]);
    }
  });
});
