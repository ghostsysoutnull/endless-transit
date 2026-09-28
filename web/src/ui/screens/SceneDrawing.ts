import type { GameOption } from '#engine/rules/GameOption.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Drawings } from './Drawings.ts';

/** Owns one fact: how a place and its travel options become what its picture draws (U01b, U02). */
export class SceneDrawing implements Drawings {
  /**
   * What the place's picture draws: a child per listed place, in the list's order, its shape from the
   * option's figure (none: no floors, no doors), and the words a reader hears instead of the picture.
   */
  of(place: PlaceSummary, travel: readonly GameOption[], decay: number): SceneVM {
    const open = travel.filter((option) => !option.sealed).length;
    const figure = place.figure;
    const tower = figure?.tower;
    return {
      key: place.drawing,
      label: `Picture of ${place.name}: ${String(travel.length)} places drawn, ${String(open)} open — the list below enters them too`,
      address: place.address,
      children: travel.map((option) => ({
        id: option.id,
        ordinal: option.ordinal,
        name: option.place,
        floors: option.figure?.floors ?? 0,
        doors: option.figure?.doors ?? 0,
        landmark: option.landmark,
        visited: option.visited,
        sealed: option.sealed,
        address: option.address,
        level: option.figure?.level ?? null,
        door: option.figure?.door ?? null,
      })),
      tower:
        figure === null || tower === undefined
          ? null
          : {
              floors: figure.floors,
              doors: figure.doors,
              address: tower.address,
              landmark: tower.landmark,
              car: tower.car,
              rows: tower.rows.flatMap((row) =>
                row.level === undefined
                  ? []
                  : [{ level: row.level, shape: row.shape ?? 'none', looks: row.looks ?? [] }],
              ),
            },
      shape: figure?.shape ?? 'none',
      slider: travel.length === 0 ? '' : place.childrenHeading,
      decay,
      noise: place.noise,
    };
  }
}
