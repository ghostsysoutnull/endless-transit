import type { Seed } from '#engine/rng/Seed.ts';
import type { TraceSummary } from '#engine/rules/TraceSummary.ts';
import type { Drawings } from './Drawings.ts';
import type { PassageLevel } from './PassageLevel.ts';

/** Owns one fact: how a trace becomes the levels of a passage — each drawn as its band is, going into the next. */
export class PassageLevels {
  readonly #drawings: Drawings;

  constructor(drawings: Drawings) {
    this.#drawings = drawings;
  }

  of(trace: TraceSummary, noise: Seed, decay: number): readonly PassageLevel[] {
    const steps = trace.steps;
    return steps.map((step, index) => ({
      drawing: this.#drawings.band(step, noise, decay),
      into: steps[index + 1]?.address ?? '',
      icon: step.icon,
      kind: step.kind,
      name: step.name,
    }));
  }
}
