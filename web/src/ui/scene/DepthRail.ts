import type { GlyphLook } from '#engine/model/GlyphLook.ts';
import type { Canvases } from '#ui/canvas/Canvases.ts';
import type { PixelCanvas } from '#ui/canvas/PixelCanvas.ts';
import type { ReducedMotion } from '#ui/ReducedMotion.ts';
import type { Clock } from './Clock.ts';
import type { PoleGlyph } from './PoleGlyph.ts';
import type { RailVM } from './RailVM.ts';

/** The widest a level's slot on the rail gets, in CSS pixels, and how big its mark is in it at most. */
const SLOT = 30;
const MARK = 7;
/** How much larger the mark of the level you stand in is, and how far its ring stands off it. */
const YOU = 1.45;
const RING = 3.5;
/** How long a step along the rail takes, in milliseconds, and how far above the line a mark drops from or lifts to. */
const MOVE = 420;
const DROP = 13;

/**
 * The depth rail's picture (Decision 6): the levels' own marks — the pole's glyphs — strung on a line from the
 * universe to you, a pulse running down it; the mark you stand in larger, alive and ringed. A step moves it: going
 * down a mark drops onto the line and the ring slides to it, going up the mark left lifts off, and a place taken for
 * another at the same depth drops in anew. As coherence falls the line frays and reddens, as the trace's thread does.
 * Still under reduced motion. It also says which level stands nearest a finger. Built in `main.ts`; an entity — which
 * rail shows, which one showed before it, and since when.
 */
export class DepthRail {
  readonly #canvases: Canvases;
  readonly #clock: Clock;
  readonly #motion: ReducedMotion;
  readonly #glyphs: Readonly<Record<GlyphLook, PoleGlyph>>;
  #host: HTMLElement | undefined;
  #canvas: PixelCanvas | undefined;
  #stop: (() => void) | undefined;
  #rail: RailVM | undefined;
  #before: RailVM['levels'] = [];
  #since = -MOVE;

  constructor(parts: {
    readonly canvases: Canvases;
    readonly clock: Clock;
    readonly motion: ReducedMotion;
    readonly glyphs: Readonly<Record<GlyphLook, PoleGlyph>>;
  }) {
    this.#canvases = parts.canvases;
    this.#clock = parts.clock;
    this.#motion = parts.motion;
    this.#glyphs = parts.glyphs;
  }

  /** This rail in this host: moved to from the one shown, when its levels differ; as it stands the first time. */
  show(host: HTMLElement, rail: RailVM): void {
    const shown = this.#rail;
    if (shown === undefined) {
      this.#before = rail.levels;
      this.#since = -MOVE;
    } else if (!this.#same(shown.levels, rail.levels)) {
      this.#before = shown.levels;
      this.#since = this.#clock.now();
    }
    this.#rail = rail;
    if (host !== this.#host || this.#canvas === undefined) {
      this.#stop?.();
      this.#stop = undefined;
      this.#canvas?.remove();
      this.#host = host;
      this.#canvas = this.#canvases.mount(host, () => {
        this.#frame(this.#motion.reduced() ? 0 : this.#clock.now());
      });
      this.#canvas.decorative();
    }
    this.#canvas.frameChanged();
    if (this.#motion.reduced()) {
      this.#frame(0);
      return;
    }
    this.#stop ??= this.#clock.subscribe((time) => {
      this.#frame(time);
    });
  }

  clear(): void {
    this.#stop?.();
    this.#stop = undefined;
    this.#canvas?.remove();
    this.#canvas = undefined;
    this.#host = undefined;
    this.#rail = undefined;
    this.#before = [];
  }

  /** The level whose mark stands nearest a pointer, by its place on the rail; none while no rail shows. */
  nearest(event: MouseEvent): number | undefined {
    const canvas = this.#canvas;
    const count = this.#rail?.levels.length ?? 0;
    if (canvas === undefined || count === 0) return undefined;
    const slot = this.#slot(canvas.hostSize().width, count);
    return Math.min(count - 1, Math.max(0, Math.floor(canvas.pointAt(event).x / slot)));
  }

  #same(one: RailVM['levels'], other: RailVM['levels']): boolean {
    return (
      one.length === other.length && one.every((level, index) => level.address === other[index]?.address)
    );
  }

  /** A level's slot: room is kept for one more mark, so the one left on the way up lifts off inside the rail. */
  #slot(width: number, count: number): number {
    return Math.min(SLOT, width / (count + 1));
  }

  #frame(time: number): void {
    const canvas = this.#canvas;
    const rail = this.#rail;
    if (canvas === undefined || rail === undefined) return;
    const size = canvas.hostSize();
    if (size.width === 0 || size.height === 0) return;
    canvas.fit(size);
    const palette = canvas.palette();
    const reduced = this.#motion.reduced();
    const levels = rail.levels;
    const before = this.#before;
    const slot = this.#slot(size.width, levels.length);
    const middle = size.height / 2;
    const small = Math.min(MARK, slot * 0.29);
    const big = small * YOU;
    const x = (index: number): number => (index + 0.5) * slot;
    const progress = reduced ? 1 : Math.min(1, Math.max(0, time - this.#since) / MOVE);
    const eased = 1 - Math.pow(1 - progress, 3);
    const you = levels.length - 1;
    const was = before.length - 1;
    const ringAt = x(was) + (x(you) - x(was)) * eased;
    const decay = rail.decay;
    canvas.paint((context) => {
      context.clearRect(0, 0, size.width, size.height);
      context.lineCap = 'round';
      // The line, from the universe to the ring: frayed and doubled in red as coherence falls.
      const line = new Path2D();
      line.moveTo(x(0), middle);
      line.lineTo(Math.max(x(0), ringAt), middle);
      if (decay > 0) {
        context.globalAlpha = 0.4 * decay;
        context.strokeStyle = palette('rd');
        context.lineWidth = 1.5;
        context.save();
        if (!reduced) context.translate(Math.sin(time / 90) * 2 * decay, Math.cos(time / 130) * 1.5 * decay);
        context.stroke(line);
        context.restore();
        context.setLineDash([18 + 26 * (1 - decay), 3 + 14 * decay]);
      }
      context.strokeStyle = palette('frame');
      context.globalAlpha = 0.55;
      context.lineWidth = 1.5;
      context.stroke(line);
      context.setLineDash([]);
      if (!reduced) {
        // The pulse, running down toward you.
        context.setLineDash([3, 30]);
        context.lineDashOffset = -time * 0.05;
        context.strokeStyle = palette('wh');
        context.globalAlpha = 0.8;
        context.lineWidth = 2;
        context.stroke(line);
        context.setLineDash([]);
        context.lineDashOffset = 0;
      }
      const mark = (
        glyph: GlyphLook,
        at: { readonly x: number; readonly y: number },
        yours: number,
        alpha: number,
        seconds: number,
      ): void => {
        const radius = small + (big - small) * yours;
        // The line stops short of the mark.
        context.globalAlpha = alpha;
        context.fillStyle = palette('ground');
        context.beginPath();
        context.arc(at.x, at.y, radius + 2.5, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = alpha * (0.75 + 0.25 * yours);
        context.lineWidth = 1 + 0.5 * yours;
        this.#glyphs[glyph].paint({
          painter: context,
          at,
          radius,
          seconds,
          ink: yours > 0.5 ? palette('wh') : palette('frame'),
          accent: palette('yl'),
        });
      };
      levels.forEach((level, index) => {
        // A place that did not stand here before drops onto the line.
        const fresh = before[index]?.address !== level.address;
        const yours = (index === you ? eased : 0) + (index === was ? 1 - eased : 0);
        mark(
          level.glyph,
          { x: x(index), y: middle - (fresh ? (1 - eased) * DROP : 0) },
          Math.min(1, yours),
          fresh ? eased : 1,
          index === you && !reduced ? time / 1000 : 0,
        );
      });
      // The marks left on the way up lift off and fade.
      if (progress < 1) {
        before.slice(levels.length).forEach((level, offset) => {
          const index = levels.length + offset;
          mark(
            level.glyph,
            { x: x(index), y: middle - eased * DROP },
            index === was ? 1 - eased : 0,
            1 - eased,
            0,
          );
        });
      }
      // The ring round you, and a ripple breathing out of it.
      const ring = big + RING;
      context.globalAlpha = 1;
      context.strokeStyle = palette('frame');
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(ringAt, middle, ring, 0, Math.PI * 2);
      context.stroke();
      if (!reduced) {
        const spread = ((time / 1000) * 0.6) % 1;
        context.strokeStyle = palette('yl');
        context.globalAlpha = 0.6 * (1 - spread);
        context.beginPath();
        context.arc(ringAt, middle, ring * (1 + spread * 0.3), 0, Math.PI * 2);
        context.stroke();
      }
      context.globalAlpha = 1;
    });
  }
}
