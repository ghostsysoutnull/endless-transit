import type { GameOption } from '#engine/rules/GameOption.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Drawing } from './Drawing.ts';
import type { Drawings } from './Drawings.ts';
import { DrawnCorridor } from './DrawnCorridor.ts';
import { DrawnStreet } from './DrawnStreet.ts';
import { DrawnTower } from './DrawnTower.ts';
import { ListedParts } from './ListedParts.ts';
import { Undrawn } from './Undrawn.ts';

/** Owns one fact: how a place and its travel options become what its picture draws (U01b, U02). */
export class SceneDrawing implements Drawings {
  /**
   * What the place's picture draws, told by its portrait: a child per listed place the portrait draws a part for,
   * in the list's order (`ListedParts`), with what the part adds; and the words a reader hears instead of the picture.
   */
  of(place: PlaceSummary, travel: readonly GameOption[], decay: number): Drawing {
    return place.portrait.drawnBy<Drawing>({
      street: (buildings) =>
        new DrawnStreet(
          this.#frame(
            place,
            decay,
            new ListedParts(buildings).drawn(travel, (option, building) => ({
              ...this.#child(option),
              floors: building.floors,
              doors: building.doors,
            })),
          ),
        ),
      tower: (tower) =>
        new DrawnTower({
          ...this.#frame(
            place,
            decay,
            new ListedParts(tower.rows).drawn(travel, (option, row) => ({
              ...this.#child(option),
              level: row.level,
            })),
          ),
          tower,
        }),
      corridor: (corridor) =>
        new DrawnCorridor({
          ...this.#frame(
            place,
            decay,
            new ListedParts(corridor.doors).drawn(travel, (option, door) => ({
              ...this.#child(option),
              door: { look: door.look, words: door.words },
            })),
          ),
          shape: corridor.shape,
        }),
      // The plan's picture comes with its host (U03, a later commit): until then a room keeps its screen.
      plan: () =>
        new Undrawn(
          this.#frame(
            place,
            decay,
            travel.map((option) => this.#child(option)),
          ),
        ),
      unseen: () =>
        new Undrawn(
          this.#frame(
            place,
            decay,
            travel.map((option) => this.#child(option)),
          ),
        ),
    });
  }

  /** What every picture's view model shares, around its children: the words a reader hears count what is drawn. */
  #frame<C extends SceneChild>(place: PlaceSummary, decay: number, children: readonly C[]): SceneVM<C> {
    const open = children.filter((child) => !child.sealed).length;
    return {
      label: `Picture of ${place.name}: ${String(children.length)} places drawn, ${String(open)} open — the list below enters them too`,
      address: place.address,
      children,
      slider: place.childrenHeading,
      decay,
      noise: place.noise,
    };
  }

  /** What every picture knows of a listed place. */
  #child(option: GameOption): SceneChild {
    return {
      id: option.id,
      ordinal: option.ordinal,
      name: option.place,
      landmark: option.landmark,
      visited: option.visited,
      sealed: option.sealed,
      address: option.address,
    };
  }
}
