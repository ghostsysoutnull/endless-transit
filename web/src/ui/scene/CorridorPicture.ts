import type { DoorStateLook } from '#engine/model/DoorStateLook.ts';
import type { MaterialFamily } from '#engine/model/MaterialFamily.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { CorridorParts } from './CorridorParts.ts';
import { DoorQuad } from './DoorQuad.ts';
import { HallView } from './HallView.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { SceneVM } from './SceneVM.ts';
import { TravelCamera } from './TravelCamera.ts';

/**
 * The mock's walk (`transit-reframed.html:985-991, 1363, 1371`): a finger moves the view a unit every 40 px, a swipe
 * up walking on; a release coasts for 0.3 s and settles in 560 ms; a walk of d units takes 260 + 220·√d ms, at most
 * 1.5 s.
 */
const DRAG = -1 / 40;
const COAST = 0.3;
const SETTLE = { base: 560, per: 0 };
const PACE = { base: 260, per: 220, most: 1500 };
/** The slider (the mock's `.scrub`, `:74-84`): a band this far in from the sides and the foot, this tall, round. */
const BAND_INSET = 10;
const BAND = 52;
/** The track inside the band: in from its left for the elevator's mark, in from its right for the hall's end. */
const TRACK_LEFT = 34;
const TRACK_RIGHT = 76;
/** The slider's window spans this much of the hall, a finger holding it by its middle; at least this wide. */
const WINDOW = 9;
const GRIP = 4.5;
const WINDOW_LEAST = 26;
/**
 * A door's number shows while it is this near, its word nearer still (only the nearest pair: at the 12 px floor the
 * mock's 4.5 lets the next pair's words run into each other); it can be tapped while this near.
 */
const NUMBER_NEAR = 7;
const WORD_NEAR = 3;
const REACH = 11;
/** A door stands this deep in the wall on either side of its place, and is drawn no nearer than just past `near`. */
const HALF_DOOR = 0.45;
/** The fog past which a door's number is written in the dim ink. */
const FAINT = 0.5;

/** A door where the view puts it: the child it draws, its place in the hall and its outline on the picture. */
interface Placed {
  readonly child: SceneVM['children'][number];
  readonly index: number;
  readonly depth: number;
  readonly fog: number;
  readonly quad: DoorQuad;
}

/**
 * Draws a floor's corridor as the mock walks it (U02; the mock's `corridor`, `transit-reframed.html:828-866`):
 * first person, the doors in pairs down both walls, the near ones large and the far ones in haze; the floor's lines
 * and the lamps overhead running into the fog, the hall bending away when curved and ending as its shape says;
 * each door in its state's ink, patterned by its material, its state's mark moving on it, its number when near,
 * its name when lit, its word close by, a dot once visited; the door you stand by in yellow. Along the foot, the
 * slider: a tick per door by side and state, the window you see, you, and the hall's two ends. The view is how far
 * along the hall you stand, owned by the scene host. A pure function of its view-model, size, time, lit child,
 * view and the door you stand by; it builds none of its parts.
 */
export class CorridorPicture implements ScenePicture<SceneVM> {
  readonly #parts: CorridorParts;

  constructor(parts: CorridorParts) {
    this.#parts = parts;
  }

  camera(vm: SceneVM, size: PictureSize): SceneCamera {
    const hall = this.#hall(vm, size, 0);
    const band = this.#band(size);
    const track = this.#track(size);
    const valueAt = (x: number): number => ((x - track.left) / track.width) * hall.length() - GRIP;
    return new TravelCamera({
      rest: 0,
      min: 0,
      max: hall.lastStop(),
      drag: hall.doors() === 0 ? 0 : DRAG,
      axis: 'y',
      coast: COAST,
      snap: false,
      settle: SETTLE,
      pace: PACE,
      zoom: true,
      stops: vm.children.map((child, index) => ({ id: child.id, at: hall.stopOf(index) })),
      track:
        hall.doors() === 0
          ? null
          : { ...band, axis: 'x', from: valueAt(band.x), to: valueAt(band.x + band.width) },
    });
  }

  layout(vm: SceneVM, size: PictureSize, view: number): readonly SceneHit[] {
    return this.#place(vm, size, view)
      .filter((door) => door.depth < REACH && door.quad.width() > 6)
      .map((door) => ({
        id: door.child.id,
        x: door.quad.left() - 4,
        y: door.quad.top() - 18,
        width: door.quad.width() + 8,
        height: door.quad.height() + 22,
        anchor: door.quad.middle(),
      }))
      .reverse();
  }

  paint(
    painter: Painter,
    vm: SceneVM,
    size: PictureSize,
    palette: Palette,
    time: number,
    lit: string,
    view: number,
    here: string,
  ): void {
    const seconds = time / 1000;
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.setLineDash([]);
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, size.width, size.height);
    const hall = this.#hall(vm, size, view);
    this.#floor(painter, palette, hall);
    this.#edges(painter, palette, hall);
    this.#lamps(painter, palette, hall, seconds);
    this.#parts.halls[vm.shape].end(painter, palette, hall, seconds);
    this.#parts.glow.at(
      painter,
      hall.project(0, 0, Math.min(hall.far(), 9)),
      hall.focal() * 0.7,
      palette('ground'),
      0.85,
    );
    const standing = here === '' ? (vm.children[0]?.id ?? '') : here;
    for (const door of this.#place(vm, size, view))
      this.#door(painter, palette, size, door, seconds, lit, standing);
    this.#slider(painter, vm, size, palette, hall);
    painter.globalAlpha = 1;
  }

  #hall(vm: SceneVM, size: PictureSize, view: number): HallView {
    return new HallView({ size, view, doors: vm.children.length, shape: this.#parts.halls[vm.shape] });
  }

  /** The doors in sight where the view puts them, far to near (the order they are drawn in). */
  #place(vm: SceneVM, size: PictureSize, view: number): Placed[] {
    const hall = this.#hall(vm, size, view);
    const placed: Placed[] = [];
    for (const [index, child] of vm.children.entries()) {
      const far = hall.doorAt(index) - view + HALF_DOOR;
      const near = far - 2 * HALF_DOOR;
      if (far < hall.near() + 0.1 || near > hall.far()) continue;
      const depth = Math.max(near, hall.near() + 0.05);
      const side = index % 2 === 1 ? 1 : -1;
      placed.push({
        child,
        index,
        depth,
        fog: hall.fog(depth),
        quad: new DoorQuad([
          hall.project(side, hall.floor(), depth),
          hall.project(side, hall.floor(), far),
          hall.project(side, hall.doorTop(), far),
          hall.project(side, hall.doorTop(), depth),
        ]),
      });
    }
    return placed.sort((one, other) => other.depth - one.depth);
  }

  /** The floor, filled between the two walls' feet as far as the hall is drawn. */
  #floor(painter: Painter, palette: Palette, hall: HallView): void {
    const depths = hall.depths();
    painter.beginPath();
    for (const [step, z] of depths.entries()) {
      const point = hall.project(-1, hall.floor(), z);
      if (step === 0) painter.moveTo(point.x, point.y);
      else painter.lineTo(point.x, point.y);
    }
    for (const z of [...depths].reverse()) {
      const point = hall.project(1, hall.floor(), z);
      painter.lineTo(point.x, point.y);
    }
    painter.closePath();
    painter.globalAlpha = 0.7;
    painter.fillStyle = palette('panel');
    painter.fill();
  }

  /** The walls' four edges, fading into the fog, and a line across the floor at every unit of the hall. */
  #edges(painter: Painter, palette: Palette, hall: HallView): void {
    const depths = hall.depths();
    painter.strokeStyle = palette('cy');
    painter.lineWidth = 1;
    for (const [x, y] of [
      [-1, hall.floor()],
      [1, hall.floor()],
      [-1, hall.ceiling()],
      [1, hall.ceiling()],
    ] as const) {
      for (let step = 1; step < depths.length; step++) {
        const from = hall.project(x, y, depths[step - 1] ?? 0);
        const to = hall.project(x, y, depths[step] ?? 0);
        painter.globalAlpha = 0.45 * hall.fog(depths[step] ?? 0);
        painter.beginPath();
        painter.moveTo(from.x, from.y);
        painter.lineTo(to.x, to.y);
        painter.stroke();
      }
    }
    for (const z of this.#units(hall)) {
      const left = hall.project(-1, hall.floor(), z);
      const right = hall.project(1, hall.floor(), z);
      painter.globalAlpha = 0.13 * hall.fog(z);
      painter.beginPath();
      painter.moveTo(left.x, left.y);
      painter.lineTo(right.x, right.y);
      painter.stroke();
    }
  }

  /** A lamp over every second unit of the hall, each flickering at its own beat, its light glowing round it. */
  #lamps(painter: Painter, palette: Palette, hall: HallView, seconds: number): void {
    for (const z of this.#units(hall)) {
      const unit = Math.round(z + hall.view());
      if (unit % 2 !== 0 || 0.5 + 0.5 * Math.sin(seconds * 7 + unit * 3) <= 0.1) continue;
      const left = hall.project(-0.14, hall.ceiling(), z);
      const right = hall.project(0.14, hall.ceiling(), z);
      const fog = hall.fog(z);
      const span = right.x - left.x;
      this.#parts.glow.at(
        painter,
        { x: (left.x + right.x) / 2, y: left.y + 4 },
        span * 1.4,
        palette('bc'),
        0.22 * fog,
      );
      painter.globalAlpha = 0.7 * fog + 0.1;
      painter.fillStyle = palette('bc');
      painter.fillRect(left.x, left.y, span, Math.max(1.5, 3 / z));
    }
  }

  /** The depths of the hall's whole units within sight. */
  #units(hall: HallView): number[] {
    const units: number[] = [];
    for (let unit = Math.ceil(hall.view() + hall.near()); unit < hall.view() + hall.far(); unit++)
      units.push(unit - hall.view());
    return units;
  }

  /** One door: filled and outlined in its state's ink, its material's panel, its state's mark, its number, word and dot. */
  #door(
    painter: Painter,
    palette: Palette,
    size: PictureSize,
    door: Placed,
    seconds: number,
    lit: string,
    here: string,
  ): void {
    const { child, quad, fog } = door;
    const isLit = child.id === lit;
    const isHere = child.id === here;
    const look = this.#lookOf(child);
    const ink = child.sealed ? 'dim' : this.#parts.inks.ink(look.state);
    painter.beginPath();
    quad.trace(painter);
    painter.globalAlpha = (isLit ? 0.24 : 0.1) * (0.4 + 0.6 * fog);
    painter.fillStyle = palette(ink);
    painter.fill();
    painter.globalAlpha = isHere || isLit ? 1 : 0.25 + 0.7 * fog;
    painter.strokeStyle = palette(isHere ? 'yl' : isLit ? 'wh' : ink);
    painter.lineWidth = isHere || isLit ? 2 : 1.2;
    painter.stroke();
    painter.save();
    painter.clip();
    painter.beginPath();
    this.#parts.panels[look.family].trace(painter, quad);
    painter.globalAlpha = 0.35 * fog;
    painter.strokeStyle = palette(ink);
    painter.lineWidth = 1;
    painter.stroke();
    this.#parts.marks[look.state].draw(painter, palette, { quad, ink, fog, key: child.address }, seconds);
    painter.restore();
    const middle = quad.middle();
    if (door.depth < NUMBER_NEAR || isLit || isHere) {
      const text = isLit || isHere ? `${child.ordinal} · ${look.name}` : child.ordinal;
      const tone = isHere ? 'yl' : isLit ? 'wh' : fog < FAINT ? 'dim' : 'text';
      this.#tag(painter, palette, size, text, { x: middle.x, y: quad.top() - 11 }, tone, isHere || isLit);
    }
    const words = child.door?.words ?? '';
    if (words !== '' && door.depth < WORD_NEAR)
      this.#tag(painter, palette, size, `‹${words}›`, middle, 'dim', false);
    if (child.visited && !isHere) {
      painter.globalAlpha = 1;
      painter.fillStyle = palette('yl');
      painter.beginPath();
      painter.arc(middle.x, quad.top() + 8, 2.5, 0, Math.PI * 2);
      painter.fill();
    }
  }

  /**
   * The door's material family, state look and the name it goes by in the hall: its material's (the mock's
   * `Riveted Iron Hatch` — the option's full name adds the word and the state, which the door already shows); a child
   * with no door's look (none in a corridor) is drawn plain under its own name.
   */
  #lookOf(child: SceneVM['children'][number]): {
    readonly family: MaterialFamily;
    readonly state: DoorStateLook;
    readonly name: string;
  } {
    const look = child.door?.look;
    return look === undefined
      ? { family: 'plain', state: 'plain', name: child.name }
      : { family: look.family(), state: look.stateLook(), name: look.material() };
  }

  /** Words on a dark backing, centred on a point and kept inside the picture (the mock's `tag`). */
  #tag(
    painter: Painter,
    palette: Palette,
    size: PictureSize,
    text: string,
    at: { readonly x: number; readonly y: number },
    tone: string,
    bold: boolean,
  ): void {
    painter.font = this.#parts.font.of(bold ? 'bold' : 'regular');
    painter.textAlign = 'center';
    painter.textBaseline = 'middle';
    const width = painter.measureText(text).width;
    const x = Math.min(Math.max(at.x, 6 + width / 2), Math.max(6 + width / 2, size.width - 6 - width / 2));
    const y = Math.min(Math.max(at.y, 12), Math.max(12, size.height - 12));
    painter.globalAlpha = 0.72;
    painter.fillStyle = palette('ground');
    painter.fillRect(x - width / 2 - 4, y - 9, width + 8, 18);
    painter.globalAlpha = 1;
    painter.fillStyle = palette(tone);
    painter.fillText(text, x, y);
  }

  /** The slider's band along the picture's foot: the box the scene host lays the real slider over. */
  #band(size: PictureSize): {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  } {
    return {
      x: BAND_INSET,
      y: size.height - BAND_INSET - BAND,
      width: size.width - 2 * BAND_INSET,
      height: BAND,
    };
  }

  /** The track inside the band: where the hall runs from its entrance to its end. */
  #track(size: PictureSize): { readonly left: number; readonly width: number; readonly y: number } {
    const band = this.#band(size);
    return {
      left: band.x + TRACK_LEFT,
      width: Math.max(1, band.width - TRACK_LEFT - TRACK_RIGHT),
      y: band.y + band.height / 2,
    };
  }

  /** The slider (the mock's `.scrub`): the band, the track, a tick per door, the window you see, you, the two ends. */
  #slider(painter: Painter, vm: SceneVM, size: PictureSize, palette: Palette, hall: HallView): void {
    if (hall.doors() === 0) return;
    const band = this.#band(size);
    const track = this.#track(size);
    const along = (value: number): number => track.left + (value / hall.length()) * track.width;
    this.#round(painter, band.x, band.y, band.width, band.height);
    painter.globalAlpha = 0.88;
    painter.fillStyle = palette('ground');
    painter.fill();
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('rule-hi');
    painter.lineWidth = 1;
    painter.stroke();
    painter.globalAlpha = 0.35;
    painter.fillStyle = palette('cy');
    painter.fillRect(track.left, track.y - 1, track.width, 2);
    for (const [index, child] of vm.children.entries()) {
      const left = index % 2 === 0;
      painter.globalAlpha = child.visited ? 1 : 0.8;
      painter.fillStyle = palette(
        child.visited ? 'yl' : child.sealed ? 'dim' : this.#parts.inks.ink(this.#lookOf(child).state),
      );
      painter.fillRect(along(hall.doorAt(index)) - 1, left ? track.y - 14 : track.y + 5, 2, 9);
    }
    const view = hall.view();
    const from = along(view);
    const span = Math.max(WINDOW_LEAST, along(view + Math.min(WINDOW, hall.length() - view)) - from);
    this.#round(painter, from, track.y - 16, span, 32);
    painter.globalAlpha = 0.14;
    painter.fillStyle = palette('cy');
    painter.fill();
    painter.globalAlpha = 1;
    painter.strokeStyle = palette('cy');
    painter.stroke();
    this.#parts.glow.at(painter, { x: from, y: track.y }, 14, palette('yl'), 0.8);
    painter.globalAlpha = 1;
    painter.fillStyle = palette('yl');
    painter.beginPath();
    painter.arc(from, track.y, 6, 0, Math.PI * 2);
    painter.fill();
    this.#elevator(painter, palette, { x: band.x + 17, y: track.y });
    this.#parts.halls[vm.shape].mark(painter, palette, { x: band.x + band.width - 38, y: track.y });
  }

  /** The slider's near end: the elevator you came in by, a small car. */
  #elevator(painter: Painter, palette: Palette, at: { readonly x: number; readonly y: number }): void {
    painter.globalAlpha = 0.9;
    painter.strokeStyle = palette('dim');
    painter.lineWidth = 1.5;
    painter.strokeRect(at.x - 5, at.y - 7, 10, 14);
    painter.beginPath();
    painter.moveTo(at.x, at.y - 7);
    painter.lineTo(at.x, at.y + 7);
    painter.stroke();
  }

  /** A box with fully rounded ends, as a closed path. */
  #round(painter: Painter, x: number, y: number, width: number, height: number): void {
    const radius = Math.min(height / 2, width / 2);
    painter.beginPath();
    painter.moveTo(x + radius, y);
    painter.lineTo(x + width - radius, y);
    painter.arc(x + width - radius, y + radius, radius, -Math.PI / 2, Math.PI / 2);
    painter.lineTo(x + radius, y + height);
    painter.arc(x + radius, y + radius, radius, Math.PI / 2, (Math.PI * 3) / 2);
    painter.closePath();
  }
}
