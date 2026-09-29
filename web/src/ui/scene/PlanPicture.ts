import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { FloorPlan } from './FloorPlan.ts';
import type { Framing } from './Framing.ts';
import type { PictureFont } from './PictureFont.ts';
import { PlanCamera } from './PlanCamera.ts';
import type { PlanDoor } from './PlanDoor.ts';
import type { PlanDrawing } from './PlanDrawing.ts';
import { PlanPoint } from './PlanPoint.ts';
import type { PlanLayout } from './PlanLayout.ts';
import type { PlanVM } from './PlanVM.ts';
import type { Point } from './Point.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';

/** A thumb's reach: every tappable part of the plan is at least this big, in CSS pixels. */
const HIT = 44;
/** A relic's place in the room you stand in, a thumb's reach and a little air. */
const SPOT = 52;
/** A doorway's gap in plan units (the mock's `min(.55, len * .6)`). */
const GAP = 0.55;
/** The walls' thickness: this share of a unit, between these pixels (the mock's `clamp(z * .07, 2, 8)`). */
const WALL = { share: 0.07, least: 2, most: 8 };
/** A room's name shows once its box is this wide and tall; its number once this big. */
const NAMED = { width: 90, height: 44 };
const NUMBERED = { width: 22, height: 18 };
/** The grid: a line a unit apart, or half a unit once a unit is wider than this. */
const FINE_GRID = 60;
/** At most this many relic marks in a room's corner. */
const MARKS = 5;
/** The fog's hatching, this far apart. */
const HATCH = 9;
/** How strongly each room shows its floor, by how far it is seen. */
const FLOOR = { visited: 1, known: 0.55, fog: 0 } as const;

/** One room as the picture places it at a framing: its box on the picture and what the engine says of it. */
interface Placed {
  readonly room: PlanRoom;
  readonly box: { readonly x: number; readonly y: number; readonly width: number; readonly height: number };
  readonly here: boolean;
}

/**
 * Draws a room as its apartment's plan (U03; the mock's `apartment`, `transit-reframed.html:865-906`): the rooms laid
 * out by `PlanLayout` in walking order, walls between them and a doorway only into the next, the entrance under the
 * first; rooms not reached in fog, the ones known and visited floored, numbers and names where they fit, the relics
 * marked where the engine says they show; the room you stand in outlined, you in it, and its relics as things to tap;
 * the minimap while the plan runs past the frame. A pure function of its view-model, size, framing, time and lit option.
 */
export class PlanPicture implements PlanDrawing<PlanVM> {
  readonly #layout: PlanLayout;
  readonly #font: PictureFont;

  constructor(parts: { readonly layout: PlanLayout; readonly font: PictureFont }) {
    this.#layout = parts.layout;
    this.#font = parts.font;
  }

  camera(vm: PlanVM, size: PictureSize): PlanCamera {
    return new PlanCamera(this.#plan(vm), size);
  }

  rest(vm: PlanVM, camera: PlanCamera): Framing {
    return camera.room(this.#index(vm, vm.here));
  }

  /** A doorway leads the view into its room; the way out pulls back to the whole plan; a relic is taken where it lies. */
  stopOf(vm: PlanVM, camera: PlanCamera, id: string): Framing | undefined {
    if (vm.exits.some((exit) => exit.id === id)) return camera.whole();
    const door = vm.doors.find((each) => each.id === id);
    return door === undefined ? undefined : camera.room(this.#index(vm, door.address));
  }

  layout(vm: PlanVM, size: PictureSize, framing: Framing): readonly SceneHit[] {
    const plan = this.#plan(vm);
    const here = this.#index(vm, vm.here);
    return [
      ...this.#relicSpots(vm, plan, size, framing).map(({ relic, at }) => this.#hit(relic.id, at)),
      ...vm.doors.flatMap((door) => {
        const doorway = this.#doorway(plan, here, this.#index(vm, door.address));
        return doorway === undefined ? [] : [this.#hit(door.id, framing.toPicture(doorway.middle(), size))];
      }),
      ...vm.exits.map((exit) => this.#hit(exit.id, framing.toPicture(plan.entry().middle(), size))),
    ];
  }

  paint(
    painter: Painter,
    vm: PlanVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: ChildMark,
    framing: Framing,
  ): void {
    const plan = this.#plan(vm);
    const scale = framing.scale();
    const wall = Math.min(Math.max(scale * WALL.share, WALL.least), WALL.most);
    const placed = this.#place(vm, plan, size, framing, wall);
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
    this.#grid(painter, size, palette, framing);
    // The walls: the footprint filled solid, the rooms' floors laid over it, so what is left between them is wall.
    const origin = framing.toPicture(new PlanPoint(0, 0), size);
    painter.fillStyle = palette('rule-hi');
    painter.fillRect(
      origin.x - wall / 2,
      origin.y - wall / 2,
      plan.width() * scale + wall,
      plan.height() * scale + wall,
    );
    for (const each of placed) this.#floor(painter, each, palette);
    this.#doorways(painter, vm, plan, size, palette, framing, wall, lit);
    for (const each of placed) this.#marks(painter, each, palette, vm);
    this.#you(painter, placed, palette, time);
    this.#relics(painter, vm, plan, size, palette, framing, lit, time);
    new PlanCamera(plan, size).minimap(framing).paint(painter, palette, vm.rooms, framing);
    painter.globalAlpha = 1;
  }

  /** The apartment's plan: laid out from its room count, keyed by its first room (the same for every room of it). */
  #plan(vm: PlanVM): FloorPlan {
    return this.#layout.of(vm.rooms.length, vm.rooms[0]?.address ?? vm.address);
  }

  #index(vm: PlanVM, address: string): number {
    return Math.max(
      0,
      vm.rooms.findIndex((room) => room.address === address),
    );
  }

  /** The doorway between the room you stand in and a room next to it; none for a room further on. */
  #doorway(plan: FloorPlan, here: number, there: number): PlanDoor | undefined {
    return Math.abs(here - there) === 1 ? plan.doors()[Math.min(here, there)] : undefined;
  }

  #hit(id: string, at: Point): SceneHit {
    return { id, x: at.x - HIT / 2, y: at.y - HIT / 2, width: HIT, height: HIT, anchor: at };
  }

  /** Each room's box on the picture, inside its walls. */
  #place(vm: PlanVM, plan: FloorPlan, size: PictureSize, framing: Framing, wall: number): readonly Placed[] {
    return plan.rooms().flatMap((box, index) => {
      const room = vm.rooms[index];
      if (room === undefined) return [];
      const from = framing.toPicture(box.topLeft(), size);
      const to = framing.toPicture(box.bottomRight(), size);
      return [
        {
          room,
          box: {
            x: from.x + wall / 2,
            y: from.y + wall / 2,
            width: to.x - from.x - wall,
            height: to.y - from.y - wall,
          },
          here: room.address === vm.here,
        },
      ];
    });
  }

  /** A faint grid under the plan: a line a unit apart, half a unit when zoomed in. */
  #grid(painter: Painter, size: PictureSize, palette: Palette, framing: Framing): void {
    const step = framing.scale() > FINE_GRID ? 0.5 : 1;
    const topLeft = framing.toPlan({ x: 0, y: 0 }, size);
    const bottomRight = framing.toPlan({ x: size.width, y: size.height }, size);
    painter.strokeStyle = palette('rule');
    painter.globalAlpha = 0.5;
    painter.lineWidth = 1;
    painter.beginPath();
    for (let u = Math.floor(topLeft.x() / step) * step; u <= bottomRight.x(); u += step) {
      const x = Math.round(size.width / 2 + (u - framing.x()) * framing.scale()) + 0.5;
      painter.moveTo(x, 0);
      painter.lineTo(x, size.height);
    }
    for (let v = Math.floor(topLeft.y() / step) * step; v <= bottomRight.y(); v += step) {
      const y = Math.round(size.height / 2 + (v - framing.y()) * framing.scale()) + 0.5;
      painter.moveTo(0, y);
      painter.lineTo(size.width, y);
    }
    painter.stroke();
  }

  /** A room's floor by how far it is seen; fog hatched; the room you stand in outlined. */
  #floor(painter: Painter, placed: Placed, palette: Palette): void {
    const { box, room, here } = placed;
    painter.fillStyle = palette('ground');
    painter.globalAlpha = 1;
    painter.fillRect(box.x, box.y, box.width, box.height);
    painter.fillStyle = palette('panel');
    painter.globalAlpha = FLOOR[room.sight];
    painter.fillRect(box.x, box.y, box.width, box.height);
    if (room.sight === 'fog') {
      painter.save();
      painter.beginPath();
      painter.rect(box.x, box.y, box.width, box.height);
      painter.clip();
      painter.strokeStyle = palette('cy');
      painter.globalAlpha = 0.15;
      painter.lineWidth = 1;
      painter.beginPath();
      for (let d = -box.height; d < box.width; d += HATCH) {
        painter.moveTo(box.x + d, box.y + box.height);
        painter.lineTo(box.x + d + box.height, box.y);
      }
      painter.stroke();
      painter.restore();
    }
    if (here) {
      painter.strokeStyle = palette('yl');
      painter.globalAlpha = 1;
      painter.lineWidth = 1.6;
      painter.strokeRect(box.x + 1, box.y + 1, box.width - 2, box.height - 2);
    }
  }

  /** The doorways between each room and the next, the entrance under the first, and the one lit ringed. */
  #doorways(
    painter: Painter,
    vm: PlanVM,
    plan: FloorPlan,
    size: PictureSize,
    palette: Palette,
    framing: Framing,
    wall: number,
    lit: ChildMark,
  ): void {
    painter.fillStyle = palette('panel');
    painter.globalAlpha = 1;
    for (const door of [...plan.doors(), plan.entry()]) {
      const [one, other] = door.gap(GAP).map((end) => framing.toPicture(end, size));
      if (one === undefined || other === undefined) continue;
      const left = Math.min(one.x, other.x) - wall;
      const top = Math.min(one.y, other.y) - wall;
      painter.fillRect(left, top, Math.abs(other.x - one.x) + wall * 2, Math.abs(other.y - one.y) + wall * 2);
    }
    // The entrance: a small arrow under it, pointing in.
    const entry = framing.toPicture(plan.entry().middle(), size);
    painter.fillStyle = palette('cy');
    painter.beginPath();
    painter.moveTo(entry.x, entry.y + wall + 4);
    painter.lineTo(entry.x + 6, entry.y + wall + 12);
    painter.lineTo(entry.x - 6, entry.y + wall + 12);
    painter.closePath();
    painter.fill();
    const here = this.#index(vm, vm.here);
    const ringed = [
      ...vm.doors.flatMap((door) => {
        const doorway = this.#doorway(plan, here, this.#index(vm, door.address));
        return doorway === undefined || !lit.marks(door.id) ? [] : [doorway.middle()];
      }),
      ...vm.exits.filter((exit) => lit.marks(exit.id)).map(() => plan.entry().middle()),
    ];
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 2;
    for (const at of ringed) {
      const point = framing.toPicture(at, size);
      painter.beginPath();
      painter.arc(point.x, point.y, HIT / 2 - 4, 0, Math.PI * 2);
      painter.stroke();
    }
  }

  /** A room's number and name where they fit, its relic marks, the visited dot — none in fog. */
  #marks(painter: Painter, placed: Placed, palette: Palette, vm: PlanVM): void {
    const { box, room, here } = placed;
    if (room.sight === 'fog') return;
    const number = String(vm.rooms.indexOf(room) + 1);
    const ink = here ? 'yl' : room.sight === 'visited' ? 'text' : 'dim';
    painter.globalAlpha = 1;
    painter.textBaseline = 'middle';
    const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    const named = box.width >= NAMED.width && box.height >= NAMED.height;
    painter.font = this.#font.of(here ? 'bold' : 'regular');
    const lines = named ? this.#lines(painter, room.name, box.width - 12) : [];
    if (lines.length > 0) {
      painter.textAlign = 'center';
      painter.fillStyle = palette(ink);
      lines.forEach((line, index) => {
        painter.fillText(line, centre.x, centre.y + (index - (lines.length - 1) / 2) * 15);
      });
      painter.textAlign = 'left';
      painter.fillStyle = palette('dim');
      painter.font = this.#font.of('regular');
      painter.fillText(number, box.x + 6, box.y + 12);
    } else if (box.width >= NUMBERED.width && box.height >= NUMBERED.height) {
      painter.textAlign = 'center';
      painter.fillStyle = palette(ink);
      painter.fillText(number, centre.x, centre.y);
    }
    if (!here && room.relics > 0 && box.width > 30) {
      painter.fillStyle = palette('yl');
      for (let mark = 0; mark < Math.min(room.relics, MARKS); mark++) {
        this.#diamond(painter, box.x + box.width - 9 - mark * 9, box.y + 9, 4);
        painter.fill();
      }
    }
    if (!here && room.sight === 'visited' && box.width > 14) {
      painter.fillStyle = palette('yl');
      painter.beginPath();
      painter.arc(box.x + box.width - 7, box.y + box.height - 7, 2.3, 0, Math.PI * 2);
      painter.fill();
    }
  }

  /** A name split into at most two lines that fit this width; none when it will not fit. */
  #lines(painter: Painter, name: string, width: number): readonly string[] {
    if (painter.measureText(name).width <= width) return [name];
    const words = name.split(' ');
    for (let cut = Math.ceil(words.length / 2); cut > 0 && cut < words.length; cut++) {
      const lines = [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
      if (lines.every((line) => painter.measureText(line).width <= width)) return lines;
    }
    return [];
  }

  /** You, a slow pulse in the room you stand in. */
  #you(painter: Painter, placed: readonly Placed[], palette: Palette, time: number): void {
    const here = placed.find((each) => each.here);
    if (here === undefined) return;
    const { box } = here;
    const x = box.x + box.width / 2;
    const y = box.y + box.height - Math.min(18, box.height / 4);
    const pulse = 0.5 + 0.5 * Math.sin(time / 400);
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 0.25 + 0.2 * pulse;
    painter.beginPath();
    painter.arc(x, y, 6 + 3 * pulse, 0, Math.PI * 2);
    painter.fill();
    painter.globalAlpha = 1;
    painter.beginPath();
    painter.arc(x, y, 3.5, 0, Math.PI * 2);
    painter.fill();
  }

  /** The relics lying in the room you stand in, each in its spot: a diamond to tap, dim while the buffer is full. */
  #relics(
    painter: Painter,
    vm: PlanVM,
    plan: FloorPlan,
    size: PictureSize,
    palette: Palette,
    framing: Framing,
    lit: ChildMark,
    time: number,
  ): void {
    for (const { relic, at } of this.#relicSpots(vm, plan, size, framing)) {
      const bob = Math.sin(time / 600 + Number(relic.ordinal)) * 2;
      if (lit.marks(relic.id)) {
        painter.strokeStyle = palette('yl');
        painter.globalAlpha = 0.6;
        painter.lineWidth = 1.5;
        painter.beginPath();
        painter.arc(at.x, at.y + bob, HIT / 2 - 4, 0, Math.PI * 2);
        painter.stroke();
      }
      painter.strokeStyle = palette(relic.sealed ? 'dim' : 'yl');
      painter.globalAlpha = 1;
      painter.lineWidth = 1.6;
      this.#diamond(painter, at.x, at.y + bob, 10);
      painter.stroke();
    }
  }

  /** Where each relic lies in the room you stand in: a grid of spots in its box, as many as fit — the tiles hold the rest. */
  #relicSpots(
    vm: PlanVM,
    plan: FloorPlan,
    size: PictureSize,
    framing: Framing,
  ): readonly { readonly relic: SceneChild; readonly at: Point }[] {
    const box = plan.rooms()[this.#index(vm, vm.here)];
    if (box === undefined) return [];
    const from = framing.toPicture(box.topLeft(), size);
    const to = framing.toPicture(box.bottomRight(), size);
    const columns = Math.floor((to.x - from.x) / SPOT);
    const rows = Math.floor((to.y - from.y - SPOT / 2) / SPOT);
    if (columns < 1 || rows < 1) return [];
    const shown = vm.relics.slice(0, columns * rows);
    const used = Math.min(columns, shown.length);
    const left = (from.x + to.x) / 2 - (used * SPOT) / 2 + SPOT / 2;
    const top = from.y + SPOT / 2 + 4;
    return shown.map((relic, index) => ({
      relic,
      at: { x: left + (index % columns) * SPOT, y: top + Math.floor(index / columns) * SPOT },
    }));
  }

  #diamond(painter: Painter, x: number, y: number, radius: number): void {
    painter.beginPath();
    painter.moveTo(x, y - radius);
    painter.lineTo(x + radius * 0.7, y);
    painter.lineTo(x, y + radius);
    painter.lineTo(x - radius * 0.7, y);
    painter.closePath();
  }
}
