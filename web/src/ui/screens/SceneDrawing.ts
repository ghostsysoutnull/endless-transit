import type { GameOption } from '#engine/rules/GameOption.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Drawings } from './Drawings.ts';
import { ListedParts } from './ListedParts.ts';

/** Owns one fact: how a place and its travel options become what its picture draws (U01b, U02). */
export class SceneDrawing implements Drawings {
  /**
   * What the place's picture draws, told by its portrait: a child per listed place its portrait draws, in the list's
   * order, its part found by its address; and the words a reader hears instead of the picture.
   */
  of(place: PlaceSummary, travel: readonly GameOption[], decay: number): SceneVM {
    const open = travel.filter((option) => !option.sealed).length;
    const frame = {
      label: `Picture of ${place.name}: ${String(travel.length)} places drawn, ${String(open)} open — the list below enters them too`,
      address: place.address,
      slider: travel.length === 0 ? '' : place.childrenHeading,
      decay,
      noise: place.noise,
    };
    const child = (option: GameOption): SceneVM['children'][number] => ({
      id: option.id,
      ordinal: option.ordinal,
      name: option.place,
      floors: 0,
      doors: 0,
      landmark: option.landmark,
      visited: option.visited,
      sealed: option.sealed,
      address: option.address,
      level: null,
      door: null,
    });
    /** The listed places the portrait draws a part for, each with its part. */
    const drawn = <P extends { readonly address: string }>(
      parts: readonly P[],
      draw: (option: GameOption, part: P) => SceneVM['children'][number],
    ): SceneVM['children'] => new ListedParts(parts).drawn(travel, draw);
    return place.portrait.drawnBy<SceneVM>({
      street(buildings) {
        return {
          ...frame,
          key: 'street',
          children: drawn(buildings, (option, building) => ({
            ...child(option),
            floors: building.floors,
            doors: building.doors,
          })),
          tower: null,
          shape: 'none',
        };
      },
      tower(tower) {
        return {
          ...frame,
          key: 'building',
          children: drawn(tower.rows, (option, row) => ({ ...child(option), level: row.level })),
          tower: {
            address: tower.address,
            landmark: tower.landmark,
            car: tower.car,
            rows: tower.rows.map((row) => ({ level: row.level, shape: row.shape, looks: row.looks })),
          },
          shape: 'none',
        };
      },
      corridor(corridor) {
        return {
          ...frame,
          key: 'corridor',
          children: drawn(corridor.doors, (option, door) => ({
            ...child(option),
            door: { look: door.look, words: door.words },
          })),
          tower: null,
          shape: corridor.shape,
        };
      },
      unseen() {
        return { ...frame, key: '', children: travel.map(child), tower: null, shape: 'none' };
      },
    });
  }
}
