import type { Portrait } from '#engine/model/Portrait.ts';
import type { Seed } from '#engine/rng/Seed.ts';
import type { GameOption } from '#engine/rules/GameOption.ts';
import type { TraceStep } from '#engine/rules/TraceStep.ts';
import type { PlaceSummary } from '#engine/rules/PlaceSummary.ts';
import type { SceneChild } from '#ui/scene/SceneChild.ts';
import type { SceneVM } from '#ui/scene/SceneVM.ts';
import type { Drawing } from './Drawing.ts';
import type { Drawings } from './Drawings.ts';
import { DrawnArea } from './DrawnArea.ts';
import { DrawnCorridor } from './DrawnCorridor.ts';
import type { DrawnOptions } from './DrawnOptions.ts';
import { DrawnPlan } from './DrawnPlan.ts';
import { DrawnStreet } from './DrawnStreet.ts';
import { DrawnTower } from './DrawnTower.ts';
import { ListedParts } from './ListedParts.ts';
import { MovesInKeys } from './MovesInKeys.ts';
import { MovesOnCard } from './MovesOnCard.ts';
import { MovesInStrip } from './MovesInStrip.ts';
import { Undrawn } from './Undrawn.ts';

/** Where a picture's place stands, and what a reader hears for its slider. */
interface Framed {
  readonly name: string;
  readonly address: string;
  readonly heading: string;
  readonly noise: Seed;
}

/** What a picture may draw, as children already made: into a listed place, the moves, the way out, the takes. */
interface DrawnChildren {
  readonly travel: readonly SceneChild[];
  readonly moves: readonly SceneChild[];
  readonly leave: readonly SceneChild[];
  readonly takes: readonly SceneChild[];
}

/** Owns one fact: how a place and its travel options become what its picture draws (U01b, U02). */
export class SceneDrawing implements Drawings {
  /** Where each picture's moves sit (U03c, U03e): on the card for the plan; among the keys for every other picture; under the picture for a place no picture draws. */
  readonly #strip = new MovesInStrip();
  readonly #carded = new MovesOnCard();
  readonly #keyed = new MovesInKeys();

  /**
   * What the place's picture draws, told by its portrait: a child per listed place the portrait draws a part for,
   * in the list's order (`ListedParts`), with what the part adds; and the words a reader hears instead of the picture.
   */
  of(place: PlaceSummary, options: DrawnOptions, decay: number): Drawing {
    return this.#drawn(
      place.portrait,
      { name: place.name, address: place.address, heading: place.childrenHeading, noise: place.noise },
      {
        travel: options.travel.map((option) => this.#child(option)),
        moves: options.moves.map((option) => this.#child(option)),
        leave: options.leave.map((option) => this.#child(option)),
        takes: options.takes.map((option) => this.#child(option)),
      },
      decay,
    );
  }

  /** A level's band (U04): the same picture, its places marked by their addresses — a band picks nothing. */
  band(step: TraceStep, noise: Seed, decay: number): Drawing {
    const travel = step.children.map((child) => ({
      id: child.address,
      ordinal: child.ordinal,
      name: child.name,
      landmark: child.landmark,
      visited: child.visited,
      sealed: child.sealed,
      address: child.address,
    }));
    return this.#drawn(
      step.portrait,
      { name: step.name, address: step.address, heading: '', noise },
      { travel, moves: [], leave: [], takes: [] },
      decay,
    );
  }

  /**
   * What the place's picture draws, told by its portrait: a child per listed place the portrait draws a part for,
   * in the list's order (`ListedParts`), with what the part adds; and the words a reader hears instead of the picture.
   */
  #drawn(portrait: Portrait, place: Framed, options: DrawnChildren, decay: number): Drawing {
    const travel = options.travel;
    return portrait.drawnBy<Drawing>({
      street: (buildings) =>
        new DrawnStreet(
          this.#frame(
            place,
            decay,
            new ListedParts(buildings).drawn(travel, (child, building) => ({
              ...child,
              floors: building.floors,
              doors: building.doors,
            })),
          ),
          this.#keyed,
        ),
      tower: (tower) =>
        new DrawnTower(
          {
            ...this.#frame(
              place,
              decay,
              new ListedParts(tower.rows).drawn(travel, (child, row) => ({
                ...child,
                level: row.level,
              })),
            ),
            tower,
          },
          this.#keyed,
        ),
      corridor: (corridor) =>
        new DrawnCorridor(
          {
            ...this.#frame(
              place,
              decay,
              new ListedParts(corridor.doors).drawn(travel, (child, door) => ({
                ...child,
                door: { look: door.look, words: door.words },
              })),
            ),
            shape: corridor.shape,
            abyssal: corridor.abyssal,
          },
          this.#keyed,
        ),
      plan: (plan) => {
        // Each doorway's move by the room it leads to; the way out; the relics by their take (U03).
        const doors = options.moves.filter((move) =>
          plan.rooms.some((room) => room.address === move.address),
        );
        const exits = options.leave;
        const relics = options.takes;
        return new DrawnPlan(
          {
            ...this.#frame(place, decay, [...doors, ...exits, ...relics]),
            rooms: plan.rooms,
            here: plan.here,
            look: plan.look,
            doors,
            exits,
            relics,
            mapKey: {
              toPlan: { text: 'MAP', label: 'Apartment plan' },
              toRoom: { text: 'ROOM', label: 'Back into the room' },
            },
          },
          this.#carded,
        );
      },
      area: (area) =>
        new DrawnArea(
          {
            ...this.#frame(
              place,
              decay,
              new ListedParts(area.parts).drawn(travel, (child, part) => ({
                ...child,
                mark: part.mark,
              })),
            ),
            look: area.look,
            signal: area.signal,
          },
          this.#keyed,
        ),
      unseen: () => new Undrawn(this.#frame(place, decay, travel), this.#strip),
    });
  }

  /** What every picture's view model shares, around its children: the words a reader hears count what is drawn. */
  #frame<C extends SceneChild>(place: Framed, decay: number, children: readonly C[]): SceneVM<C> {
    const open = children.filter((child) => !child.sealed).length;
    return {
      label: `Picture of ${place.name}: ${String(children.length)} places drawn, ${String(open)} open — the list below enters them too`,
      address: place.address,
      children,
      slider: place.heading,
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
