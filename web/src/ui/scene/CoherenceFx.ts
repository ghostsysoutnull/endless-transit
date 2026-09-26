import { Seed } from '#engine/rng/Seed.ts';
import type { FxPlan } from './FxPlan.ts';

/** The tear cycles through this many frames, so a frame's plan is drawn once and reused. */
export const FX_FRAMES = 8;
/** At full decay at most this many bands tear in a frame: each is a copy of the canvas onto itself, the costliest step. */
const MAX_TEARS = 7;
/** At full decay this many grains a frame. */
const MAX_GRAIN = 500;
/** One draw of the frame's seed as a fraction: its resolution. */
const RESOLUTION = 1 << 20;
const NOTHING: FxPlan = { tears: [], grain: [], tint: 0, dark: false };

/**
 * Owns one fact: what the coherence tear draws for a frame (Decision 5; the mock's `postFx`) — torn bands,
 * grain, a red cast and a dark flash, growing with the decay — drawn from the frame's seed (`noise`) and the
 * frame of the cycle `k`, never the clock or `Math.random`. The same noise, decay and `k` always plan the
 * same frame; the plans of the current noise are kept, the rest forgotten.
 */
export class CoherenceFx {
  #noise = '';
  #decay = 0;
  #plans: (FxPlan | undefined)[] = [];

  plan(noise: string, decay: number, k: number): FxPlan {
    if (decay <= 0) return NOTHING;
    if (noise !== this.#noise || decay !== this.#decay) {
      this.#noise = noise;
      this.#decay = decay;
      this.#plans = [];
    }
    const frame = ((k % FX_FRAMES) + FX_FRAMES) % FX_FRAMES;
    const known = this.#plans[frame];
    if (known !== undefined) return known;
    const made = this.#draw((Seed.parse(noise) ?? new Seed(0, 0)).branch(frame), decay);
    this.#plans[frame] = made;
    return made;
  }

  #draw(seed: Seed, decay: number): FxPlan {
    const tears: FxPlan['tears'][number][] = [];
    for (let index = 0; index < Math.floor(decay * MAX_TEARS); index++) {
      const tear = seed.branch('tear').branch(index);
      if (this.#fraction(tear, 'keep') > 0.35 + decay * 0.5) continue;
      tears.push({
        y: this.#fraction(tear, 'y'),
        height: 2 + this.#fraction(tear, 'height') * 14 * decay,
        shift: (this.#fraction(tear, 'shift') - 0.5) * 40 * decay,
      });
    }
    const grain: FxPlan['grain'][number][] = [];
    const specks = seed.branch('grain');
    for (let index = 0; index < Math.round(decay * MAX_GRAIN); index++) {
      // One draw a grain: ten bits across, ten down, one for its colour.
      const bits = specks.branch(index).range(0, RESOLUTION * 2 - 1);
      grain.push({ x: (bits & 1023) / 1024, y: ((bits >> 10) & 1023) / 1024, red: bits >= RESOLUTION });
    }
    return {
      tears,
      grain,
      tint: 0.1 * decay,
      dark: decay > 0.5 && this.#fraction(seed, 'dark') < 0.08 * decay,
    };
  }

  #fraction(seed: Seed, key: string): number {
    return seed.branch(key).range(0, RESOLUTION - 1) / RESOLUTION;
  }
}
