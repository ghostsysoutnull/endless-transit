import { describe, expect, test } from 'vitest';
import { DoorLook } from '#engine/model/DoorLook.ts';
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
    expect(look).toEqual(
      new DoorLook({ material: 'Synth-Glass Slab', state: 'Frozen', family: 'glass', stateLook: 'frost' }),
    );
  });

  test('a list with an unknown key is refused whole, before any door is dealt', () => {
    expect(() =>
      doors('Synth-Glass Slab|A glass slab.|glass\nOdd Door|An odd door.|velvet\n', 'Frozen|Frost.|frost\n'),
    ).toThrow(/velvet/);
    expect(() => doors('Slab|A slab.|stone\n', 'Stable|It holds.|plain\nOdd|Odd.|shiny\n')).toThrow(/shiny/);
  });
});
