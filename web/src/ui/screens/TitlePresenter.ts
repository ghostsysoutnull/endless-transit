import type { DescentSummary } from '#engine/rules/DescentSummary.ts';
import { ENTER_WORLD_ID, NEW_WORLD_ID } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { Drawings } from './Drawings.ts';
import type { TitleVM } from './TitleVM.ts';

/** The options the title leads with: a world drawn, or the world entered. */
const LEADS: readonly string[] = [NEW_WORLD_ID, ENTER_WORLD_ID];

/**
 * Owns the words of the title screen — every one of them: engine snapshot in, view-model out. No DOM. The view
 * draws what this carries and adds no word of its own. The way down entering takes becomes the screen's pictures:
 * a level each, drawn as its band in the trace is, clean of any tear.
 */
export class TitlePresenter implements Presenter<TitleVM> {
  readonly #masthead: Masthead;
  readonly #drawings: Drawings;

  constructor(masthead: Masthead, drawings: Drawings) {
    this.#masthead = masthead;
    this.#drawings = drawings;
  }

  /** The title is the screen of a game that stands nowhere yet, with no prompt in the way. */
  accepts(snapshot: GameSnapshot): boolean {
    return snapshot.place === null && snapshot.prompt === null;
  }

  toViewModel(snapshot: GameSnapshot): TitleVM {
    const world = snapshot.world;
    const descent = snapshot.descent;
    return {
      scene: 'title',
      title: this.#masthead.name(),
      tagline: 'From the universe down to a single room.',
      world:
        world === null || descent === null
          ? null
          : {
              name: world.name,
              seedLabel: 'Seed',
              seed: world.seed,
              levels: this.#levels(descent),
              noise: descent.noise,
            },
      prompt: 'No world yet. Draw one to begin.',
      options: snapshot.options.map((option) => ({
        id: option.id,
        key: option.key.toUpperCase(),
        label: option.label,
        opposite: option.opposite,
        lead: LEADS.includes(option.id),
      })),
      enters: snapshot.options.some((option) => option.id === ENTER_WORLD_ID) ? ENTER_WORLD_ID : '',
      status: snapshot.message,
      build: this.#masthead.buildLine(),
    };
  }

  #levels(descent: DescentSummary): NonNullable<TitleVM['world']>['levels'] {
    const steps = descent.trace.steps;
    return steps.map((step, index) => ({
      drawing: this.#drawings.band(step, descent.noise, 0),
      into: steps[index + 1]?.address ?? '',
    }));
  }
}
