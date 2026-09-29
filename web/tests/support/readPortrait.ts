import type { BuildingFigure } from '#engine/model/BuildingFigure.ts';
import type { CorridorFigure } from '#engine/model/CorridorFigure.ts';
import type { Portrait } from '#engine/model/Portrait.ts';
import type { TowerFigure } from '#engine/model/TowerFigure.ts';

/** A portrait as a test reads it: which picture draws it and what it is handed, as plain data a test compares. */
export type ReadPortrait =
  | { readonly drawn: 'street'; readonly buildings: readonly BuildingFigure[] }
  | { readonly drawn: 'tower'; readonly tower: TowerFigure }
  | { readonly drawn: 'corridor'; readonly corridor: CorridorFigure }
  | { readonly drawn: 'unseen' };

export function readPortrait(portrait: Portrait): ReadPortrait {
  return portrait.drawnBy<ReadPortrait>({
    street: (buildings) => ({ drawn: 'street', buildings }),
    tower: (tower) => ({ drawn: 'tower', tower }),
    corridor: (corridor) => ({ drawn: 'corridor', corridor }),
    unseen: () => ({ drawn: 'unseen' }),
  });
}

/** The tower a portrait hands its picture, or a failed test when it is drawn otherwise. */
export function towerOf(portrait: Portrait): TowerFigure {
  const read = readPortrait(portrait);
  if (read.drawn !== 'tower') throw new Error(`expected a tower, got ${read.drawn}`);
  return read.tower;
}

/** The corridor a portrait hands its picture, or a failed test when it is drawn otherwise. */
export function corridorOf(portrait: Portrait): CorridorFigure {
  const read = readPortrait(portrait);
  if (read.drawn !== 'corridor') throw new Error(`expected a corridor, got ${read.drawn}`);
  return read.corridor;
}
