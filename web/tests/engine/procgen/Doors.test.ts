import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { DoorInscription } from '#engine/model/DoorInscription.ts';
import { DoorLook } from '#engine/model/DoorLook.ts';
import { INSCRIPTION_STYLES } from '#engine/model/InscriptionStyle.ts';
import { RoomCategory } from '#engine/model/RoomCategory.ts';
import { Trace } from '#engine/model/Trace.ts';
import { Deal } from '#engine/procgen/Deal.ts';
import { Doors } from '#engine/procgen/Doors.ts';
import type { DoorSlot } from '#engine/procgen/DoorSlot.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';
import { vibe } from '#tests/support/vibe.ts';
import { must } from '#tests/support/world.ts';

const RUST =
  'Iron Hatch|An iron hatch.|metal\nScrap Gate|A gate of scrap.|metal\nSlag Port|A port of slag.|glass\n';
const NEON = 'Glass Slab|A glass slab.|glass\n';
const ANCIENT = 'Mossed|Moss climbs it.|plain\nRimed|Rime seals it.|frost\nWorn|It is worn.|plain\n';
const DIGITAL = 'Glitching|It jumps.|static\n';

function doors(files: Readonly<Record<string, string>> = {}): Doors {
  return new Doors(
    new ContentLibrary(
      new MemoryContentSource({
        'themes/doors/materials/rust.txt': RUST,
        'themes/doors/materials/neon.txt': NEON,
        'themes/doors/states/ancient.txt': ANCIENT,
        'themes/doors/states/digital.txt': DIGITAL,
        'themes/doors/inscriptions/stamped.txt': 'QUARANTINE\nNO_ENTRY\nCOUNT_RESET\n',
        'themes/doors/inscriptions/scrawled.txt': 'KEEP_WALKING\nNOT_THIS_ONE\nDO_NOT_COUNT\n',
        'themes/doors/inscriptions/etched.txt': 'LATTICE\nHOLLOW\nUNMADE\n',
        'themes/doors/inscriptions/burned.txt': 'VOID_SINK\nTURN_BACK\nTOO_DEEP\n',
        ...files,
      }),
    ),
    new Deal(),
  );
}

/** Door `index` of one corridor, in a rust world of the ancient era unless the test says otherwise. */
function slot(index: number, culture = 'rust', era = 'ancient'): DoorSlot {
  return { corridor: new Seed(1, 2), index, vibe: vibe(culture, era) };
}

function leadingTo(guarantee?: DoorInscription): RoomCategory {
  return new RoomCategory('Barracks', guarantee, must(Trace.of('humming'), 'the humming trace'));
}

describe('a door’s look: a material of the culture in force and a state of the era in force', () => {
  test('the look carries the material’s family and the state’s look from their lists’ key column', () => {
    expect(doors().look(slot(0, 'neon', 'digital'))).toEqual(
      new DoorLook({ material: 'Glass Slab', state: 'Glitching', family: 'glass', stateLook: 'static' }),
    );
  });

  test('the material is one of its culture’s and the state one of its era’s', () => {
    const look = doors().look(slot(0));
    expect(['Iron Hatch', 'Scrap Gate', 'Slag Port']).toContain(look.material());
    expect(['Mossed', 'Rimed', 'Worn']).toContain(look.state());
  });

  test('the doors of one corridor share no material and no state while their lists last', () => {
    const looks = [0, 1, 2].map((index) => doors().look(slot(index)));
    expect(new Set(looks.map((look) => look.material())).size).toBe(3);
    expect(new Set(looks.map((look) => look.state())).size).toBe(3);
  });

  test('the peek and the door agree: the look alone is the look of the door that stands there', () => {
    const made = doors();
    for (const index of [0, 1, 2]) {
      expect(made.look(slot(index)).equals(made.of(slot(index), leadingTo()).look())).toBe(true);
    }
  });

  test('a list with a key the pictures do not know is refused when a door first reads it', () => {
    const odd = doors({ 'themes/doors/materials/rust.txt': `${RUST}Odd Door|An odd door.|velvet\n` });
    expect(() => odd.look(slot(0))).toThrow(/velvet/);
    const shiny = doors({ 'themes/doors/states/ancient.txt': `${ANCIENT}Odd|Odd.|shiny\n` });
    expect(() => shiny.look(slot(0))).toThrow(/shiny/);
  });
});

describe('a door’s words: a word of the list of the way it is written', () => {
  /** The worded doors among the first sixty of one corridor: one door in five is. */
  function worded(made: Doors, behind: RoomCategory): DoorInscription[] {
    return Array.from({ length: 60 }, (_, index) => made.of(slot(index), behind).inscription()).filter(
      (words) => words !== undefined,
    );
  }

  test('a word always comes in the style whose list holds it', () => {
    const lists: Readonly<Record<string, readonly string[]>> = {
      stamped: ['QUARANTINE', 'NO_ENTRY', 'COUNT_RESET'],
      scrawled: ['KEEP_WALKING', 'NOT_THIS_ONE', 'DO_NOT_COUNT'],
      etched: ['LATTICE', 'HOLLOW', 'UNMADE'],
      burned: ['VOID_SINK', 'TURN_BACK', 'TOO_DEEP'],
    };
    const seen = worded(doors(), leadingTo());
    expect(seen.length).toBeGreaterThan(0);
    for (const words of seen) expect(lists[words.style().key()], words.formatted()).toContain(words.word());
  });

  test('no two doors of a corridor say the same while the lists last', () => {
    const fifteen = (prefix: string): string =>
      Array.from({ length: 15 }, (_, n) => `${prefix}_${String.fromCharCode(65 + n)}`).join('\n');
    const made = doors({
      'themes/doors/inscriptions/stamped.txt': fifteen('STAMPED'),
      'themes/doors/inscriptions/scrawled.txt': fifteen('SCRAWLED'),
      'themes/doors/inscriptions/etched.txt': fifteen('ETCHED'),
      'themes/doors/inscriptions/burned.txt': fifteen('BURNED'),
    });
    for (let corridor = 0; corridor < 40; corridor++) {
      const said = Array.from({ length: 15 }, (_, index) =>
        made
          .of({ ...slot(index), corridor: new Seed(corridor, 9) }, leadingTo())
          .inscription()
          ?.word(),
      ).filter((word) => word !== undefined);
      expect(new Set(said).size, said.join(' ')).toBe(said.length);
    }
  });

  test('the words the room behind guarantees win over the lists', () => {
    const guarantee = new DoorInscription('DANGER', must(INSCRIPTION_STYLES[3], 'the burned style'));
    const seen = worded(doors(), leadingTo(guarantee));
    expect(seen.length).toBeGreaterThan(0);
    for (const words of seen) expect(words.formatted()).toBe('!! DANGER !!');
  });
});
