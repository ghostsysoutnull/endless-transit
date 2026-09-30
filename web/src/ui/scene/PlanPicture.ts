import type { PlanRoom } from '#engine/model/PlanRoom.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { ChildMark } from './ChildMark.ts';
import type { Diamond } from './Diamond.ts';
import type { FloorPlan } from './FloorPlan.ts';
import type { Framing } from './Framing.ts';
import type { Glow } from './Glow.ts';
import type { MinimapView } from './MinimapView.ts';
import type { PictureFont } from './PictureFont.ts';
import { PlacedRoom } from './PlacedRoom.ts';
import { PlanCamera } from './PlanCamera.ts';
import type { PlanDoor } from './PlanDoor.ts';
import type { PlanDrawing } from './PlanDrawing.ts';
import type { PlanBox } from './PlanBox.ts';
import type { PlanBoxOnPicture } from './PlanBoxOnPicture.ts';
import type { PlanLayout } from './PlanLayout.ts';
import { PlanPoint } from './PlanPoint.ts';
import type { PlanVM } from './PlanVM.ts';
import type { Point } from './Point.ts';
import type { RelicSpot } from './RelicSpot.ts';
import type { RoomInside } from './RoomInside.ts';
import type { RoomInsides } from './RoomInsides.ts';
import type { SceneChild } from './SceneChild.ts';
import type { SceneHit } from './SceneHit.ts';
import { SIGHT_LOOKS } from './SightLooks.ts';

/** A thumb's reach: every tappable part of the plan is at least this big, in CSS pixels. */
const HIT = 44;
/** A relic's label: at most this many words of its name, this far above it (the tile below the picture has it whole). */
const LABEL = { words: 2, above: 20 };
/** A doorway's gap in plan units (the mock's `min(.55, len * .6)`). */
const GAP = 0.55;
/** The walls' thickness: this share of a unit, between these pixels (the mock's `clamp(z * .07, 2, 8)`). */
const WALL = { share: 0.07, least: 2, most: 8 };
/** The grid: a line a unit apart, or half a unit once a unit is wider than this. */
const FINE_GRID = 60;

/**
 * Draws a room as its apartment's plan (U03; the mock's `apartment`, `transit-reframed.html:865-906`): the rooms laid
 * out by `PlanLayout` in walking order, walls between them and a doorway only into the next, the entrance under the
 * first; each room as its sight shows it (`SIGHT_LOOKS`: fog, known, visited), the room you stand in outlined, you in
 * it — drawn in full while its box is large enough (`RoomInsides`, U03b) — and its relics as things to tap, lit and
 * labelled; the corner map it is handed. A pure function of its view-model, size, framing, time and
 * lit option.
 */
export class PlanPicture implements PlanDrawing<PlanVM> {
  readonly #layout: PlanLayout;
  readonly #font: PictureFont;
  readonly #diamond: Diamond;
  readonly #insides: RoomInsides;
  readonly #glow: Glow;

  constructor(parts: {
    readonly layout: PlanLayout;
    readonly font: PictureFont;
    readonly diamond: Diamond;
    readonly insides: RoomInsides;
    readonly glow: Glow;
  }) {
    this.#layout = parts.layout;
    this.#font = parts.font;
    this.#diamond = parts.diamond;
    this.#insides = parts.insides;
    this.#glow = parts.glow;
  }

  camera(vm: PlanVM, size: PictureSize): PlanCamera {
    return new PlanCamera(this.#plan(vm), size);
  }

  rest(vm: PlanVM, camera: PlanCamera): Framing {
    return camera.room(this.#index(vm, vm.here));
  }

  home(vm: PlanVM, camera: PlanCamera): Framing {
    return camera.inside(this.#index(vm, vm.here));
  }

  inside(vm: PlanVM, camera: PlanCamera, id: string): Framing | undefined {
    if (vm.exits.some((exit) => exit.id === id)) return camera.whole();
    const door = vm.doors.find((each) => each.id === id);
    return door === undefined ? undefined : camera.inside(this.#index(vm, door.address));
  }

  /** A doorway leads the view into its room; the way out pulls back to the whole plan; a relic is taken where it lies. */
  stopOf(vm: PlanVM, camera: PlanCamera, id: string): Framing | undefined {
    if (vm.exits.some((exit) => exit.id === id)) return camera.whole();
    const door = vm.doors.find((each) => each.id === id);
    return door === undefined ? undefined : camera.room(this.#index(vm, door.address));
  }

  layout(vm: PlanVM, size: PictureSize, framing: Framing): readonly SceneHit[] {
    const plan = this.#plan(vm);
    return [
      ...this.#relicSpots(vm, plan, size, framing).map(({ relic, spot }) => this.#hit(relic.id, spot.at)),
      ...vm.doors.flatMap((door) => {
        const doorway = this.#doorwayTo(vm, plan, door);
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
    corner: MinimapView,
  ): void {
    const plan = this.#plan(vm);
    const scale = framing.scale();
    const wall = this.#wall(framing);
    const rooms = this.#place(vm, plan, size, framing);
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
    for (const room of rooms) room.paintFloor(painter, palette, time);
    this.#doorways(painter, vm, plan, size, palette, framing, wall, lit);
    for (const room of rooms) room.paintMarks(painter, palette, { font: this.#font, diamond: this.#diamond });
    for (const room of rooms) this.#you(painter, room.you(), palette, time);
    this.#relics(painter, vm, plan, size, palette, framing, lit, time);
    corner.paint(painter, palette, vm.rooms, framing);
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

  /** The doorway a door's move goes through: between the room you stand in and the room it leads to. */
  #doorwayTo(vm: PlanVM, plan: FloorPlan, door: SceneChild): PlanDoor | undefined {
    return plan.doorBetween(this.#index(vm, vm.here), this.#index(vm, door.address));
  }

  /** The walls' thickness at this framing, in CSS pixels. */
  #wall(framing: Framing): number {
    return Math.min(Math.max(framing.scale() * WALL.share, WALL.least), WALL.most);
  }

  /** A room's box on the picture, inside its walls. */
  #onPicture(box: PlanBox, size: PictureSize, framing: Framing): PlanBoxOnPicture {
    const wall = this.#wall(framing);
    const from = framing.toPicture(box.topLeft(), size);
    const to = framing.toPicture(box.bottomRight(), size);
    return {
      x: from.x + wall / 2,
      y: from.y + wall / 2,
      width: to.x - from.x - wall,
      height: to.y - from.y - wall,
    };
  }

  /** What a room's box holds: the room you stand in by its look, any other plain. */
  #inside(vm: PlanVM, room: PlanRoom, box: PlanBoxOnPicture): RoomInside {
    return room.address === vm.here ? this.#insides.here(box, vm.look, vm.here) : this.#insides.away(box);
  }

  #hit(id: string, at: Point): SceneHit {
    return { id, x: at.x - HIT / 2, y: at.y - HIT / 2, width: HIT, height: HIT, anchor: at };
  }

  /** Each room as the picture places it: its box inside its walls, its sight's look, what it holds, its number, whether you are in it. */
  #place(vm: PlanVM, plan: FloorPlan, size: PictureSize, framing: Framing): readonly PlacedRoom[] {
    return plan.rooms().flatMap((box, index) => {
      const room = vm.rooms[index];
      if (room === undefined) return [];
      const onPicture = this.#onPicture(box, size, framing);
      return [
        new PlacedRoom({
          room,
          box: onPicture,
          look: SIGHT_LOOKS[room.sight],
          inside: this.#inside(vm, room, onPicture),
          number: String(index + 1),
          here: room.address === vm.here,
        }),
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
      const x = Math.round(framing.toPicture(new PlanPoint(u, 0), size).x) + 0.5;
      painter.moveTo(x, 0);
      painter.lineTo(x, size.height);
    }
    for (let v = Math.floor(topLeft.y() / step) * step; v <= bottomRight.y(); v += step) {
      const y = Math.round(framing.toPicture(new PlanPoint(0, v), size).y) + 0.5;
      painter.moveTo(0, y);
      painter.lineTo(size.width, y);
    }
    painter.stroke();
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
    const ringed = [
      ...vm.doors.flatMap((door) => {
        const doorway = this.#doorwayTo(vm, plan, door);
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

  /** You, a slow pulse where you stand; nothing in a room you do not stand in. */
  #you(painter: Painter, at: Point | undefined, palette: Palette, time: number): void {
    if (at === undefined) return;
    const pulse = 0.5 + 0.5 * Math.sin(time / 400);
    painter.fillStyle = palette('yl');
    painter.globalAlpha = 0.25 + 0.2 * pulse;
    painter.beginPath();
    painter.arc(at.x, at.y, 6 + 3 * pulse, 0, Math.PI * 2);
    painter.fill();
    painter.globalAlpha = 1;
    painter.beginPath();
    painter.arc(at.x, at.y, 3.5, 0, Math.PI * 2);
    painter.fill();
  }

  /**
   * The relics lying in the room you stand in, each in its spot: a glowing diamond to tap, dim while the buffer is
   * full, labelled with the first words of its name where they fit its spot — the one lit always, over the rest.
   */
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
    const placed = this.#relicSpots(vm, plan, size, framing);
    for (const { relic, spot } of placed) {
      const at = { x: spot.at.x, y: spot.at.y + Math.sin(time / 600 + Number(relic.ordinal)) * 2 };
      const shining = lit.marks(relic.id);
      if (!relic.sealed) this.#glow.at(painter, at, shining ? 44 : 34, palette('yl'), shining ? 0.45 : 0.3);
      if (shining) {
        painter.strokeStyle = palette('yl');
        painter.globalAlpha = 0.6;
        painter.lineWidth = 1.5;
        painter.beginPath();
        painter.arc(at.x, at.y, HIT / 2 - 4, 0, Math.PI * 2);
        painter.stroke();
      }
      painter.strokeStyle = palette(relic.sealed ? 'dim' : 'yl');
      painter.globalAlpha = 1;
      painter.lineWidth = 1.6;
      this.#diamond.trace(painter, at.x, at.y, 10);
      painter.stroke();
    }
    painter.font = this.#font.of('regular');
    painter.textAlign = 'center';
    painter.textBaseline = 'middle';
    painter.globalAlpha = 1;
    const labelled = [
      ...placed.filter(({ relic }) => !lit.marks(relic.id)),
      ...placed.filter(({ relic }) => lit.marks(relic.id)),
    ];
    for (const { relic, spot } of labelled) {
      const shining = lit.marks(relic.id);
      const label = this.#label(painter, relic.name, shining ? Infinity : spot.reach);
      if (label === '') continue;
      painter.fillStyle = palette(shining ? 'wh' : relic.sealed ? 'dim' : 'yl');
      painter.fillText(label, spot.at.x, spot.at.y - LABEL.above);
    }
  }

  /** A relic's label: the most of its first words that fit this width, two at most; nothing when one will not fit. */
  #label(painter: Painter, name: string, width: number): string {
    const words = name.split(' ');
    for (let count = Math.min(LABEL.words, words.length); count > 0; count--) {
      const label = words.slice(0, count).join(' ');
      if (painter.measureText(label).width <= width) return label;
    }
    return '';
  }

  /** Where each relic lies in the room you stand in, as its inside places them — the tiles hold the rest. */
  #relicSpots(
    vm: PlanVM,
    plan: FloorPlan,
    size: PictureSize,
    framing: Framing,
  ): readonly { readonly relic: SceneChild; readonly spot: RelicSpot }[] {
    const box = plan.rooms()[this.#index(vm, vm.here)];
    const room = vm.rooms.find((each) => each.address === vm.here);
    if (box === undefined || room === undefined) return [];
    const spots = this.#inside(vm, room, this.#onPicture(box, size, framing)).spots(vm.relics.length);
    return spots.flatMap((spot, index) => {
      const relic = vm.relics[index];
      return relic === undefined ? [] : [{ relic, spot }];
    });
  }
}
