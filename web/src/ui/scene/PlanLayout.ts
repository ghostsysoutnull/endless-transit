import { FloorPlan } from './FloorPlan.ts';
import { PlanBox } from './PlanBox.ts';
import { LevelDoor } from './LevelDoor.ts';
import type { PlanDoor } from './PlanDoor.ts';
import { SideDoor } from './SideDoor.ts';
import type { Fractions } from './Fractions.ts';

/** A room's area in plan units (the mock's `n * 1.7`, `transit-reframed.html:577`). */
const ROOM_AREA = 1.7;
/** The footprint's width to height, squared (the mock's `W = sqrt(A * 1.35)`). */
const WIDE = 1.35;
/** A room's width in its row, before the row is fitted to the footprint: this, plus up to `SPREAD` more. */
const NARROWEST = 0.8;
const SPREAD = 0.4;
/** Where the hash is read for which rows take a spare room, and for each row's widths (a row reads up to 50). */
const SPARE = 200;
const WIDTHS = 300;
const ROW_WIDTHS = 50;
/** Two walls closer than this are one. */
const EDGE = 1e-9;

/**
 * Owns one fact (U03): how an apartment's rooms are laid out — a pure function of the room count and the address.
 * The game walks room *n* to *n + 1* (departure 1 of `tasks/ui/U03.md`, the user's pick), so the rooms run in
 * serpentine rows: the bottom row walked left to right, the next right to left, and so on up. Each row is as tall as
 * its share of the rooms and cuts its own widths, so the plan reads as uneven brickwork; within a row each room
 * shares a whole wall with the next, and a row's last room sits under the next row's first. The first room touches
 * the bottom, where the entrance is.
 */
export class PlanLayout {
  readonly #noise: Fractions;

  constructor(noise: Fractions) {
    this.#noise = noise;
  }

  of(count: number, address: string): FloorPlan {
    const rooms = Math.max(1, count);
    const area = rooms * ROOM_AREA;
    const width = Math.sqrt(area * WIDE);
    const height = area / width;
    const laid: PlanBox[] = [];
    let top = height;
    this.#rowCounts(rooms, height, address).forEach((inRow, row) => {
      const tall = (height * inRow) / rooms;
      top -= tall;
      const shares = Array.from(
        { length: inRow },
        (_, at) => NARROWEST + SPREAD * this.#noise.fraction(address, WIDTHS + row * ROW_WIDTHS + at),
      );
      const whole = shares.reduce((sum, share) => sum + share, 0);
      let left = 0;
      const boxes = shares.map((share) => {
        const box = new PlanBox(left, top, (width * share) / whole, tall);
        left += box.width();
        return box;
      });
      laid.push(...(row % 2 === 0 ? boxes : boxes.reverse()));
    });
    const first = laid[0] ?? new PlanBox(0, 0, width, height);
    return new FloorPlan({
      width,
      height,
      rooms: laid,
      doors: laid.slice(1).map((next, index) => this.#between(laid[index] ?? next, next)),
      entry: new LevelDoor(height, first.left(), first.right()),
    });
  }

  /** How many rooms each row holds, bottom row first: rows about a room tall, the spare rooms given to rows the hash picks. */
  #rowCounts(rooms: number, height: number, address: string): readonly number[] {
    const rows = Math.max(1, Math.min(rooms, Math.round(height / Math.sqrt(ROOM_AREA))));
    const each = Math.floor(rooms / rows);
    const spare = rooms - each * rows;
    const takers = new Set(
      Array.from({ length: rows }, (_, row) => row)
        .sort(
          (one, other) =>
            this.#noise.fraction(address, SPARE + one) - this.#noise.fraction(address, SPARE + other),
        )
        .slice(0, spare),
    );
    return Array.from({ length: rows }, (_, row) => (takers.has(row) ? each + 1 : each));
  }

  /** The doorway between a room and the next: the middle of the wall they share. */
  #between(one: PlanBox, next: PlanBox): PlanDoor {
    const meet = (a: number, b: number): boolean => Math.abs(a - b) < EDGE;
    if (meet(one.right(), next.left()) || meet(next.right(), one.left())) {
      const x = meet(one.right(), next.left()) ? one.right() : one.left();
      return new SideDoor(x, Math.max(one.top(), next.top()), Math.min(one.bottom(), next.bottom()));
    }
    const y = meet(one.bottom(), next.top()) ? one.bottom() : one.top();
    return new LevelDoor(y, Math.max(one.left(), next.left()), Math.min(one.right(), next.right()));
  }
}
