import type { CorridorVM } from '#ui/scene/CorridorVM.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { StreetVM } from '#ui/scene/StreetVM.ts';
import type { TowerVM } from '#ui/scene/TowerVM.ts';
import { Unsketched } from '#ui/scene/Unsketched.ts';
import type { Drawing } from '#ui/screens/Drawing.ts';

/** A drawing as a test reads it: which picture it is for and that picture's view model, as plain data a test compares. */
export type ReadDrawing =
  | { readonly drawn: 'street'; readonly vm: StreetVM }
  | { readonly drawn: 'tower'; readonly vm: TowerVM }
  | { readonly drawn: 'corridor'; readonly vm: CorridorVM }
  | { readonly drawn: 'unseen'; readonly vm: SceneVM<SceneChild> };

/** Which picture the drawing asks the book for, and with what; a drawing that asks for none is unseen. */
export function readDrawing(drawing: Drawing): ReadDrawing {
  let read: ReadDrawing = { drawn: 'unseen', vm: drawing.frame() };
  drawing.sketchedBy({
    street(vm) {
      read = { drawn: 'street', vm };
      return new Unsketched(vm);
    },
    tower(vm) {
      read = { drawn: 'tower', vm };
      return new Unsketched(vm);
    },
    corridor(vm) {
      read = { drawn: 'corridor', vm };
      return new Unsketched(vm);
    },
  });
  return read;
}

/** The street's view model, or a failed test when the drawing is for another picture. */
export function streetVM(drawing: Drawing): StreetVM {
  const read = readDrawing(drawing);
  if (read.drawn !== 'street') throw new Error(`expected the street, got ${read.drawn}`);
  return read.vm;
}

/** The tower's view model, or a failed test when the drawing is for another picture. */
export function towerVM(drawing: Drawing): TowerVM {
  const read = readDrawing(drawing);
  if (read.drawn !== 'tower') throw new Error(`expected the tower, got ${read.drawn}`);
  return read.vm;
}

/** The corridor's view model, or a failed test when the drawing is for another picture. */
export function corridorVM(drawing: Drawing): CorridorVM {
  const read = readDrawing(drawing);
  if (read.drawn !== 'corridor') throw new Error(`expected the corridor, got ${read.drawn}`);
  return read.vm;
}
