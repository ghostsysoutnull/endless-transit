import type { DoorStateLook } from '#engine/model/DoorStateLook.ts';
import type { MaterialFamily } from '#engine/model/MaterialFamily.ts';
import type { Painter } from '#ui/canvas/Painter.ts';
import type { Palette } from '#ui/canvas/Palette.ts';
import type { PictureSize } from '#ui/canvas/Picture.ts';
import type { CorridorParts } from './CorridorParts.ts';
import { CorridorSlider } from './CorridorSlider.ts';
import { HallView } from './HallView.ts';
import { PlacedDoor } from './PlacedDoor.ts';
import type { Point } from './Point.ts';
import { Quad } from './Quad.ts';
import type { SceneCamera } from './SceneCamera.ts';
import type { SceneHit } from './SceneHit.ts';
import type { ScenePicture } from './ScenePicture.ts';
import type { CorridorVM } from './CorridorVM.ts';
import { StillCamera } from './StillCamera.ts';
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
/** A door stands this deep in the wall on either side of its place, and is drawn no nearer than just past `near`. */
const HALF_DOOR = 0.45;

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
export class CorridorPicture implements ScenePicture<CorridorVM> {
  readonly #parts: CorridorParts;

  constructor(parts: CorridorParts) {
    this.#parts = parts;
  }

  /** The walk along the hall; a hall without doors stands still. */
  camera(vm: CorridorVM, size: PictureSize): SceneCamera {
    const hall = this.#hall(vm, size, 0);
    if (!hall.walks()) return new StillCamera();
    return new TravelCamera({
      rest: 0,
      min: 0,
      max: hall.lastStop(),
      drag: DRAG,
      axis: 'y',
      coast: COAST,
      snap: false,
      settle: SETTLE,
      pace: PACE,
      zoom: true,
      stops: vm.children.map((child, index) => ({ id: child.id, at: hall.stopOf(index) })),
      track: new CorridorSlider({ size, hall }).track(),
    });
  }

  layout(vm: CorridorVM, size: PictureSize, view: number): readonly SceneHit[] {
    return this.#place(vm, size, view)
      .filter((door) => door.inReach())
      .map((door) => door.hit())
      .reverse();
  }

  paint(
    painter: Painter,
    vm: CorridorVM,
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
    const shape = this.#parts.halls[vm.shape];
    if (hall.endInSight()) shape.end(painter, palette, hall.endFace(), hall.fog(hall.endAhead()), seconds);
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
    new CorridorSlider({ size, hall }).draw(
      painter,
      palette,
      vm.children.map((child) => ({ ink: this.#inkOf(child), visited: child.visited })),
      this.#parts.glow,
      shape,
    );
    painter.globalAlpha = 1;
  }

  #hall(vm: CorridorVM, size: PictureSize, view: number): HallView {
    return new HallView({ size, view, doors: vm.children.length, shape: this.#parts.halls[vm.shape] });
  }

  /** The doors in sight where the view puts them, far to near (the order they are drawn in). */
  #place(vm: CorridorVM, size: PictureSize, view: number): PlacedDoor[] {
    const hall = this.#hall(vm, size, view);
    const placed: PlacedDoor[] = [];
    for (const [index, child] of vm.children.entries()) {
      const far = hall.doorAt(index) - view + HALF_DOOR;
      const near = far - 2 * HALF_DOOR;
      if (far < hall.near() + 0.1 || near > hall.far()) continue;
      const depth = Math.max(near, hall.near() + 0.05);
      const side = hall.sideOf(index);
      placed.push(
        new PlacedDoor({
          child,
          depth,
          fog: hall.fog(depth),
          quad: new Quad([
            hall.project(side, hall.floor(), depth),
            hall.project(side, hall.floor(), far),
            hall.project(side, hall.doorTop(), far),
            hall.project(side, hall.doorTop(), depth),
          ]),
        }),
      );
    }
    return placed.sort((one, other) => one.fartherFirst(other));
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
    door: PlacedDoor,
    seconds: number,
    lit: string,
    here: string,
  ): void {
    const child = door.child();
    const quad = door.quad();
    const fog = door.fog();
    const isLit = child.id === lit;
    const isHere = child.id === here;
    const named = isLit || isHere;
    // A named door's own ink: yellow where you stand, white where you point.
    const accent = isHere ? 'yl' : 'wh';
    const look = this.#lookOf(child);
    const ink = this.#inkOf(child);
    painter.beginPath();
    quad.trace(painter);
    painter.globalAlpha = (isLit ? 0.24 : 0.1) * (0.4 + 0.6 * fog);
    painter.fillStyle = palette(ink);
    painter.fill();
    painter.globalAlpha = named ? 1 : 0.25 + 0.7 * fog;
    painter.strokeStyle = palette(named ? accent : ink);
    painter.lineWidth = named ? 2 : 1.2;
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
    if (door.showsNumber(named)) {
      const text = named ? `${child.ordinal} · ${look.name}` : child.ordinal;
      const tone = named ? accent : door.faint() ? 'dim' : 'text';
      this.#tag(painter, palette, size, text, { x: middle.x, y: quad.top() - 11 }, tone, named);
    }
    if (door.showsWord()) this.#tag(painter, palette, size, `‹${door.word()}›`, middle, 'dim', false);
    if (child.visited && !isHere) {
      painter.globalAlpha = 1;
      painter.fillStyle = palette('yl');
      painter.beginPath();
      painter.arc(middle.x, quad.top() + 8, 2.5, 0, Math.PI * 2);
      painter.fill();
    }
  }

  /** The ink a door is drawn in: its state's, dim when sealed. */
  #inkOf(child: CorridorVM['children'][number]): string {
    return child.sealed ? 'dim' : this.#parts.inks.ink(this.#lookOf(child).state);
  }

  /**
   * The door's material family, state look and the name it goes by in the hall: its material's (the mock's
   * `Riveted Iron Hatch` — the option's full name adds the word and the state, which the door already shows).
   */
  #lookOf(child: CorridorVM['children'][number]): {
    readonly family: MaterialFamily;
    readonly state: DoorStateLook;
    readonly name: string;
  } {
    const look = child.door.look;
    return { family: look.family(), state: look.stateLook(), name: look.material() };
  }

  /** Words on a dark backing, centred on a point and kept inside the picture (the mock's `tag`). */
  #tag(
    painter: Painter,
    palette: Palette,
    size: PictureSize,
    text: string,
    at: Point,
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
}
