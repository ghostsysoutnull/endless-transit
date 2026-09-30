import type { RoomLook } from '#engine/model/RoomLook.ts';
import { DrawnInside } from './DrawnInside.ts';
import type { Fractions } from './Fractions.ts';
import { PlainInside } from './PlainInside.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { RoomInside } from './RoomInside.ts';
import type { RoomLight } from './RoomLight.ts';
import type { RoomWall } from './RoomWall.ts';

/** The room you stand in is drawn in full once its box on the picture is at least this big. */
const FULL = { width: 100, height: 80 };
/** How far apart relics lie, centre to centre, in any room: a thumb's reach (the picture's 44 px tap) and a little air. */
const SPOT = 52;

/**
 * Owns one fact: what a room's box holds on the plan (U03b) — the room you stand in drawn in full when its box is large
 * enough, its wall by its culture's key and its light by its era's (a key with none listed: a plain wall, no light);
 * every other room plain. A service; `ScenePictures` hands it the walls and lights.
 */
export class RoomInsides {
  readonly #walls: Readonly<Record<string, RoomWall>>;
  readonly #lights: Readonly<Record<string, RoomLight>>;
  readonly #plainWall: RoomWall;
  readonly #noLight: RoomLight;
  readonly #noise: Fractions;

  constructor(parts: {
    walls: Readonly<Record<string, RoomWall>>;
    lights: Readonly<Record<string, RoomLight>>;
    plainWall: RoomWall;
    noLight: RoomLight;
    noise: Fractions;
  }) {
    this.#walls = parts.walls;
    this.#lights = parts.lights;
    this.#plainWall = parts.plainWall;
    this.#noLight = parts.noLight;
    this.#noise = parts.noise;
  }

  /** The room you stand in: in full by its look when its box is large enough, else plain. */
  here(box: PlanBoxOnPicture, look: RoomLook, address: string): RoomInside {
    if (box.width < FULL.width || box.height < FULL.height) return new PlainInside(box, SPOT);
    return new DrawnInside({
      box,
      spot: SPOT,
      wall: this.#walls[look.walls()] ?? this.#plainWall,
      light: this.#lights[look.light()] ?? this.#noLight,
      furniture: look.furniture(),
      cold: look.cold(),
      address,
      noise: this.#noise,
    });
  }

  /** A room you do not stand in: plain. */
  away(box: PlanBoxOnPicture): RoomInside {
    return new PlainInside(box, SPOT);
  }
}
