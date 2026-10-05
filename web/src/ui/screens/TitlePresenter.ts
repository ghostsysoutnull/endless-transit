import { ENTER_WORLD_ID, NEW_WORLD_ID } from '#engine/rules/GameOption.ts';
import type { GameSnapshot } from '#engine/rules/GameSnapshot.ts';
import type { Masthead } from '#ui/Masthead.ts';
import type { Presenter } from '#ui/Presenter.ts';
import type { PassageLevels } from './PassageLevels.ts';
import type { TitleVM } from './TitleVM.ts';

/** The options the title leads with: a world drawn, or the world entered. */
const LEADS: readonly string[] = [NEW_WORLD_ID, ENTER_WORLD_ID];

/**
 * Owns the words of the title screen — every one of them: engine snapshot in, view-model out. No DOM. The view
 * draws what this carries and adds no word of its own. The way down entering takes becomes the screen's levels,
 * clean of any tear.
 */
export class TitlePresenter implements Presenter<TitleVM> {
  readonly #masthead: Masthead;
  readonly #levels: PassageLevels;

  constructor(masthead: Masthead, levels: PassageLevels) {
    this.#masthead = masthead;
    this.#levels = levels;
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
              levels: this.#levels.of(descent.trace, descent.noise, 0),
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
}
