import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { HallShape } from './HallShape.ts';

/** The mock's corridor (`transit-reframed.html:523-526, 832-834`): a pair of doors every 2.2 units, the first at 2.2. */
const SPACING = 2.2;
/** A door's stop stands this far short of it, so the door is in sight and large. */
const STAND_OFF = 2.4;
/** The hall's floor, ceiling and doors' tops, in half-widths; its walls at ±1. */
const FLOOR = -0.85;
const CEILING = 0.95;
const DOOR_TOP = 0.5;
/** The fog's depth, the nearest depth drawn and the deepest. */
const FOG = 6.5;
const NEAR = 0.32;
const DEEPEST = 16;

/**
 * The corridor seen from where you stand (U02; the mock's `corridor`): where a point of the hall falls on the
 * picture, how thick the fog is at a depth, how deep the hall is drawn, where each pair of doors stands and where
 * its stop is. Built for one size, view, door count and shape; the shape says how it bends and how far it reaches.
 * Value object.
 */
export class HallView {
  readonly #size: PictureSize;
  readonly #view: number;
  readonly #doors: number;
  readonly #shape: HallShape;
  readonly #focal: number;

  constructor(facts: { size: PictureSize; view: number; doors: number; shape: HallShape }) {
    if (!(facts.doors >= 0))
      throw new RangeError(`a hall has no fewer than no doors: ${String(facts.doors)}`);
    this.#size = facts.size;
    this.#view = facts.view;
    this.#doors = facts.doors;
    this.#shape = facts.shape;
    this.#focal = Math.min(facts.size.width * 0.36, facts.size.height * 0.46);
  }

  /** Where a point of the hall falls on the picture: `x` across (walls at ±1), `y` up, `z` ahead of you. */
  project(x: number, y: number, z: number): { readonly x: number; readonly y: number } {
    const depth = Math.max(z, NEAR);
    return {
      x: this.#size.width / 2 + ((x + this.#shape.bend(depth)) / depth) * this.#focal,
      y: this.#size.height * 0.42 - (y / depth) * this.#focal,
    };
  }

  /** How much of a thing at this depth shows through the fog, 1 at your feet. */
  fog(z: number): number {
    return Math.exp(-z / FOG);
  }

  /** The picture's scale: how many pixels a unit of the hall spans at depth 1. */
  focal(): number {
    return this.#focal;
  }

  near(): number {
    return NEAR;
  }

  /** How deep the hall is drawn from here. */
  far(): number {
    return this.#shape.reach(this.endAhead(), DEEPEST);
  }

  /** How far ahead the hall's end stands, and whether it is within sight. */
  endAhead(): number {
    return this.length() - this.#view;
  }

  endInSight(): boolean {
    return this.endAhead() <= DEEPEST;
  }

  floor(): number {
    return FLOOR;
  }

  ceiling(): number {
    return CEILING;
  }

  doorTop(): number {
    return DOOR_TOP;
  }

  /** The depths the hall's edges are drawn through, near to far: fine close by, coarser further on. */
  depths(): readonly number[] {
    const far = this.far();
    const depths: number[] = [];
    for (let z = NEAR; z < far; z += z < 3 ? 0.25 : 0.6) depths.push(z);
    depths.push(far);
    return depths;
  }

  /** The view: how far along the hall you stand. */
  view(): number {
    return this.#view;
  }

  /** The hall's length: one spacing past its last pair. */
  length(): number {
    return (Math.ceil(this.#doors / 2) + 1) * SPACING;
  }

  /** How far along the hall the door with this index stands (doors in pairs, the even ones on the left). */
  doorAt(index: number): number {
    return (Math.floor(index / 2) + 1) * SPACING;
  }

  /** Where you stand to open the door with this index. */
  stopOf(index: number): number {
    return Math.max(0, this.doorAt(index) - STAND_OFF);
  }

  /** How far along the hall the last door's stop is: the walk's end. */
  lastStop(): number {
    return this.#doors === 0 ? 0 : this.stopOf(this.#doors - 1);
  }

  /** How many doors the hall has. */
  doors(): number {
    return this.#doors;
  }
}
