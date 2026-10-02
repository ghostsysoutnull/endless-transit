import type { Seed } from '#engine/rng/Seed.ts';
import type { Painter } from './Painter.ts';
import type { Palette } from './Palette.ts';
import type { Picture, PictureSize } from './Picture.ts';
import type { SpectrumVM } from './SpectrumVM.ts';

/** The strip's height, a bar's width and the least gap between bars, in CSS pixels; the faint lines behind them. */
const HEIGHT = 48;
const BAR = 5;
const GAP = 2;
const GRID = 3;
/** How far a bar may sit off the anchors' line, how far it swings each cycle, and the least it ever shows. */
const JITTER = 0.4;
const SWING = 0.3;
const FLOOR = 0.05;
/** A seed's draw as a fraction: the seed deals whole numbers, this many steps make the fraction. */
const STEPS = 1000;

/**
 * The quantum spectrogram as a live analyser (U03e): a strip of bars across the pane, their line the engine's five
 * anchor heights, each bar set off that line and swung between two heights by the frame's seed — the clock only paces
 * the swing (`phase`), it never picks a height. The same frame at the same phase is the same picture.
 */
export class SpectrumPicture implements Picture<SpectrumVM> {
  height(): number {
    return HEIGHT;
  }

  paint(painter: Painter, vm: SpectrumVM, size: PictureSize, palette: Palette, phase: number): void {
    const { width, height } = size;
    const bars = Math.max(1, Math.floor((width + GAP) / (BAR + GAP)));
    const pitch = bars === 1 ? 0 : (width - BAR) / (bars - 1);
    painter.globalAlpha = 1;
    painter.shadowBlur = 0;
    painter.fillStyle = palette('ground');
    painter.fillRect(0, 0, width, height);
    painter.fillStyle = palette('rule');
    for (let line = 1; line <= GRID; line++) {
      painter.fillRect(0, Math.round(height - (height * line) / (GRID + 1)), width, 1);
    }
    const noise = vm.noise.branch('spectrum');
    for (let i = 0; i < bars; i++) {
      const bar = noise.branch(i);
      const base = this.#onLine(vm, bars === 1 ? 0 : i / (bars - 1));
      const from = clamp(base * (1 - JITTER / 2 + JITTER * fraction(bar.branch('off'))));
      const to = clamp(from + (fraction(bar.branch('swing')) - 0.5) * SWING);
      const wave = 0.5 - 0.5 * Math.cos(2 * Math.PI * (phase + fraction(bar.branch('phase'))));
      const level = Math.max(FLOOR, from + (to - from) * wave);
      const x = Math.round(i * pitch);
      const top = Math.round(height - level * height);
      painter.fillStyle = palette('cy');
      painter.globalAlpha = 0.5;
      painter.fillRect(x, top, BAR, height - top);
      painter.globalAlpha = 1;
      painter.fillRect(x, top, BAR, 2);
      painter.fillStyle = palette('wh');
      painter.globalAlpha = 0.85;
      painter.fillRect(x, top, BAR, 1);
    }
    painter.globalAlpha = 1;
  }

  /** The anchors' line at `t` (0 at the first anchor, 1 at the last), as a share of the tallest. */
  #onLine(vm: SpectrumVM, t: number): number {
    const anchors = vm.anchors;
    const last = anchors.length - 1;
    if (last < 0) return 0;
    const span = last * t;
    const index = Math.min(Math.floor(span), last);
    const low = anchors[index] ?? 0;
    const high = anchors[index + 1] ?? low;
    return (low + (high - low) * (span - index)) / vm.tallest;
  }
}

function fraction(seed: Seed): number {
  return seed.range(0, STEPS) / STEPS;
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
