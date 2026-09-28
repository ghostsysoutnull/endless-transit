import { describe, expect, test } from 'vitest';
import { ContentLibrary } from '#engine/content/ContentLibrary.ts';
import { Doors } from '#engine/procgen/Doors.ts';
import { Seed } from '#engine/rng/Seed.ts';
import { MemoryContentSource } from '#tests/support/MemoryContentSource.ts';

function doors(materials: string, states: string): Doors {
  return new Doors(
    new ContentLibrary(
      new MemoryContentSource({
        'themes/doors/materials.txt': materials,
        'themes/doors/states.txt': states,
        'themes/doors/inscriptions.txt': 'LATTICE\n',
      }),
    ),
  );
}

describe('a door’s look: its material and state by name, and the keys their lists give them', () => {
  test('the look carries the family and the state’s look from the lists’ key column', () => {
    const look = doors('Synth-Glass Slab|A glass slab.|glass\n', 'Frozen|Frost seals it.|frost\n').look(
      new Seed(1, 2),
    );
    expect(look).toEqual({
      material: 'Synth-Glass Slab',
      state: 'Frozen',
      family: 'glass',
      stateLook: 'frost',
    });
  });

  test('a list with an unknown key is refused whole, whichever of its lines a door is dealt', () => {
    const materials = doors(
      'Synth-Glass Slab|A glass slab.|glass\nOdd Door|An odd door.|velvet\n',
      'Frozen|Frost.|frost\n',
    );
    const states = doors('Slab|A slab.|stone\n', 'Stable|It holds.|plain\nOdd|Odd.|shiny\n');
    for (let n = 0; n < 16; n++) {
      expect(() => materials.look(new Seed(n, n))).toThrow(/velvet/);
      expect(() => states.look(new Seed(n, n))).toThrow(/shiny/);
    }
  });
});
